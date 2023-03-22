/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IStudent extends Document {
  readonly name: string;
  readonly class: number;
  readonly roll: number;
  readonly gender: string;
  readonly marks: number;
}
