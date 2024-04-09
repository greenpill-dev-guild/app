export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      images: {
        Row: {
          id: string;
          image_url: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          user_id: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fkey_user_id";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      milestones: {
        Row: {
          budget: number;
          description: string;
          id: string;
          proposal_id: string | null;
          title: string;
        };
        Insert: {
          budget: number;
          description: string;
          id?: string;
          proposal_id?: string | null;
          title: string;
        };
        Update: {
          budget?: number;
          description?: string;
          id?: string;
          proposal_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "proposal_milestones_proposal_id_fkey";
            columns: ["proposal_id"];
            isOneToOne: false;
            referencedRelation: "proposals";
            referencedColumns: ["id"];
          },
        ];
      };
      proposal_collaborators: {
        Row: {
          proposal_id: string;
          user_id: string | null;
        };
        Insert: {
          proposal_id: string;
          user_id?: string | null;
        };
        Update: {
          proposal_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "proposal_collaborators_collaborator_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proposal_collaborators_proposal_id_fkey";
            columns: ["proposal_id"];
            isOneToOne: false;
            referencedRelation: "proposals";
            referencedColumns: ["id"];
          },
        ];
      };
      proposal_votes: {
        Row: {
          created_at: string;
          id: string;
          proposal_id: string;
          user_id: string;
          vote_type: boolean;
        };
        Insert: {
          created_at?: string;
          id?: string;
          proposal_id: string;
          user_id: string;
          vote_type: boolean;
        };
        Update: {
          created_at?: string;
          id?: string;
          proposal_id?: string;
          user_id?: string;
          vote_type?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "public_proposal_votes_proposal_id_fkey";
            columns: ["proposal_id"];
            isOneToOne: false;
            referencedRelation: "proposals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_proposal_votes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      proposals: {
        Row: {
          author_id: string;
          banner_image: string;
          budget: number;
          community: string | null;
          created_at: string;
          end_date: string;
          id: string;
          location: string;
          milestones: Json | null;
          name: string;
          problem: string;
          solution: string;
          start_date: string;
        };
        Insert: {
          author_id: string;
          banner_image: string;
          budget: number;
          community?: string | null;
          created_at?: string;
          end_date: string;
          id?: string;
          location: string;
          milestones?: Json | null;
          name: string;
          problem: string;
          solution: string;
          start_date: string;
        };
        Update: {
          author_id?: string;
          banner_image?: string;
          budget?: number;
          community?: string | null;
          created_at?: string;
          end_date?: string;
          id?: string;
          location?: string;
          milestones?: Json | null;
          name?: string;
          problem?: string;
          solution?: string;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "proposals_user_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          address: string;
          created_at: string | null;
          email: string | null;
          id: string;
          location: string | null;
          onboarded: boolean;
          phone_number: string | null;
          profile_image: string | null;
          username: string | null;
        };
        Insert: {
          address: string;
          created_at?: string | null;
          email?: string | null;
          id: string;
          location?: string | null;
          onboarded?: boolean;
          phone_number?: string | null;
          profile_image?: string | null;
          username?: string | null;
        };
        Update: {
          address?: string;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          location?: string | null;
          onboarded?: boolean;
          phone_number?: string | null;
          profile_image?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_proposal_with_collaborators: {
        Args: {
          proposal_id: string;
        };
        Returns: {
          title: string;
          author: Json;
          location: string;
          summary: string;
          affected_locations: string;
          community_problem: string;
          proposed_solution: string;
          minimum_budget: number;
          key_players: string;
          timeline: string;
          collaborators: Json[];
          approved: boolean;
          allo_recipient_id: string;
          allo_anchor_address: string;
        }[];
      };
      get_proposals_with_collaborators: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          title: string;
          author: Json;
          location: string;
          summary: string;
          collaborators: Json[];
          approved: boolean;
          allo_recipient_id: string;
          allo_anchor_address: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      combined_id: {
        proposal_id: string | null;
        user_id: string | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
