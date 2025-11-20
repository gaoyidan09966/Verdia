export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface PlantAnalysisResult {
  plantName: string;
  scientificName: string;
  careInstructions: {
    water: string;
    sunlight: string;
    soil: string;
    temperature: string;
  };
  description: string;
  commonPests: string[];
}

export type ViewState = 'home' | 'analyze' | 'chat';
