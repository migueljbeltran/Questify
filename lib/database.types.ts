export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          xp: number;
          current_streak: number;
          longest_streak: number;
          last_completion_date: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_completion_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_completion_date?: string | null;
          created_at?: string;
        };
      };
      chores: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          base_xp: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          base_xp: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          base_xp?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      chore_completions: {
        Row: {
          id: string;
          user_id: string;
          chore_id: string;
          xp_awarded: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          chore_id: string;
          xp_awarded: number;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          chore_id?: string;
          xp_awarded?: number;
          completed_at?: string;
        };
      };
    };
  };
}
