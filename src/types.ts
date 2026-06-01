/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ServiceCategory {
  BIOMEDICAL = "BIOMEDICAL",
  POWER = "POWER",
}

export enum RequestType {
  INSTALLATION = "INSTALLATION",
  PREVENTIVE_MAINTENANCE = "PREVENTIVE_MAINTENANCE",
  REPAIR = "REPAIR",
  CALIBRATION = "CALIBRATION",
  TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
  POWER_SENSE = "POWER_SENSE",
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  category: ServiceCategory;
  benefits: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: "diagnostics" | "patient-care" | "laboratory" | "power-solutions";
  description: string;
  specs: string[];
  features: string[];
  isFeatured: boolean;
  imageSrc?: string;
}

export interface PowerAppliance {
  id: string;
  name: string;
  runningWatts: number;
  startingWatts: number;
  category: "imaging" | "life-support" | "laboratory" | "facility" | "cooling";
}

export interface ServiceRequest {
  id: string;
  facilityName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  requestType: string;
  equipmentDetails: string;
  urgency: "routine" | "urgent" | "emergency";
  message: string;
  status: "pending" | "scheduled" | "completed";
  createdAt: string;
}

export interface GeneratorResult {
  totalRunningWatts: number;
  totalStartingWatts: number;
  recommendedKva: number;
  fuelConsumptionLitresPerHr: number;
  recommendedGeneratorModels: string[];
}
