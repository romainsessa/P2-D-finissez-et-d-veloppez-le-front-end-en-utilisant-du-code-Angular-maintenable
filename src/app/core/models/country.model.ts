import { Participation } from "./participation.model";

export interface Country {
  country: string;
  participations: Participation[];
}
