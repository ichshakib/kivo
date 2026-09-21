import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env';
import { DEFAULT_GEMINI_MODEL } from '../constants/ai.constants';
import { ApiError } from '../utils/ApiError';
import logger from '../logger/winston.logger';

export interface GenerateTextOptions {
  prompt: string;
  model?: string;
  systemInstruction?: string;
  thinkingLevel?: 'low' | 'medium' | 'high';
  temperature?: number;
  maxOutputTokens?: number;
  previousInteractionId?: string;
}

export interface GenerateTextResult {
  text: string;
  interactionId?: string;
  model: string;
  thinkingLevel?: string;
}

/**
 * Service class wrapping Google GenAI SDK (Gemini Interactions & Text Generation).
 */
export class AiService {
  private client: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    if (!this.client) {
      const apiKey = ENV.GEMINI.API_KEY;
      if (!apiKey) {
        throw new ApiError(
          500,
          'GEMINI_API_KEY is not configured in the environment. Please add it to your .env file.'
        );
      }
      this.client = new GoogleGenAI({ apiKey });
    }
    return this.client;
  }

  /**
   * Generates text response from a prompt using Gemini Interactions API.
   */
  async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
    const {
      prompt,
      model = DEFAULT_GEMINI_MODEL,
      systemInstruction,
      thinkingLevel,
      temperature,
      maxOutputTokens,
      previousInteractionId,
    } = options;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new ApiError(400, 'Prompt string is required');
    }

    const ai = this.getClient();

    try {
      logger.info(`[AiService] Generating text with model '${model}'...`);

      const generationConfig: Record<string, unknown> = {};
      if (thinkingLevel) generationConfig.thinking_level = thinkingLevel;
      if (typeof temperature === 'number') generationConfig.temperature = temperature;
      if (typeof maxOutputTokens === 'number') generationConfig.max_output_tokens = maxOutputTokens;

      const payload: Record<string, unknown> = {
        model,
        input: prompt.trim(),
      };

      if (systemInstruction) {
        payload.system_instruction = systemInstruction;
      }

      if (Object.keys(generationConfig).length > 0) {
        payload.generation_config = generationConfig;
      }

      if (previousInteractionId) {
        payload.previous_interaction_id = previousInteractionId;
      }

      // 1. Try modern Interactions API
      if (ai.interactions && typeof ai.interactions.create === 'function') {
        const interaction = await ai.interactions.create(payload as any);
        const outputText =
          (interaction as any).output_text ||
          (interaction as any).outputText ||
          (interaction as any).steps?.[0]?.content?.[0]?.text ||
          '';

        return {
          text: outputText,
          interactionId: (interaction as any).id,
          model,
          thinkingLevel,
        };
      }

      // 2. Fallback to models.generateContent if interactions API is not available
      if (ai.models && typeof ai.models.generateContent === 'function') {
        const response = await ai.models.generateContent({
          model,
          contents: prompt.trim(),
          config: {
            systemInstruction,
            temperature,
            maxOutputTokens,
          },
        } as any);

        return {
          text: (response as any).text || '',
          model,
          thinkingLevel,
        };
      }

      throw new ApiError(500, 'Unable to find compatible Gemini generation method on SDK client');
    } catch (error: any) {
      logger.error(`[AiService] Text generation failed: ${error.message || error}`);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, error.message || 'Failed to generate text from Gemini API');
    }
  }

  /**
   * Streams text response using the Gemini Interactions API.
   */
  async streamText(options: GenerateTextOptions) {
    const {
      prompt,
      model = DEFAULT_GEMINI_MODEL,
      systemInstruction,
      thinkingLevel,
      temperature,
      maxOutputTokens,
      previousInteractionId,
    } = options;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new ApiError(400, 'Prompt string is required');
    }

    const ai = this.getClient();

    try {
      logger.info(`[AiService] Streaming text with model '${model}'...`);

      const generationConfig: Record<string, unknown> = {};
      if (thinkingLevel) generationConfig.thinking_level = thinkingLevel;
      if (typeof temperature === 'number') generationConfig.temperature = temperature;
      if (typeof maxOutputTokens === 'number') generationConfig.max_output_tokens = maxOutputTokens;

      const payload: Record<string, unknown> = {
        model,
        input: prompt.trim(),
        stream: true,
      };

      if (systemInstruction) payload.system_instruction = systemInstruction;
      if (Object.keys(generationConfig).length > 0) payload.generation_config = generationConfig;
      if (previousInteractionId) payload.previous_interaction_id = previousInteractionId;

      if (ai.interactions && typeof ai.interactions.create === 'function') {
        return await ai.interactions.create(payload as any);
      }

      if (ai.models && typeof ai.models.generateContentStream === 'function') {
        return await ai.models.generateContentStream({
          model,
          contents: prompt.trim(),
          config: {
            systemInstruction,
            temperature,
            maxOutputTokens,
          },
        } as any);
      }

      throw new ApiError(500, 'Streaming is not supported by current SDK client');
    } catch (error: any) {
      logger.error(`[AiService] Streaming failed: ${error.message || error}`);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, error.message || 'Failed to stream response from Gemini API');
    }
  }
}

export const aiService = new AiService();
export default aiService;
