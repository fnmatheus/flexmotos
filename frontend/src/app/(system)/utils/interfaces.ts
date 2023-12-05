import React from 'react';

export interface IPopup {
  title?: string,
  handleYes(value?: number): void,
  handleNo?(): void,
  hasText?: boolean,
  text?: string,
  hasInput?: boolean
}

export interface IProps {
  token: string
}

export interface IDoughnut {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[]
  }]
}

export interface IYearlyBilling {
  token: string,
  handleClose(): void
}

export interface IBillings {
  years: string[],
  billing: number[]
}

export interface IGetDataSystem {
  data: {
    today: number,
    goal: number,
    month: number
  }
}

export interface IGetYearlyBilling {
  data: {
    years: string[],
    billing: number[]
  }
}

export interface ISecuritie {
    CPF: string,
    name: string,
    securities: string[],
    _id: string
}

export interface IIPVAs {
  model: string,
  plate: string,
  RENAVAM: string
}

export interface IChanges {
  model: string,
  plate: string
}

export interface IDashboardTable {
  tableTitle: string,
  vehicles: string[][],
  hasButton?: boolean,
  buttonText?: string,
  handleButton?(vahicle: string[]): void,
  hasThirdText?: boolean,
  hasPopup?: boolean,
  popup?: string[],
  popuptext?: string,
  handleYes?(): void,
  handleNo?(): void
}

export interface IPageHeader {
  textButton: string,
  handleAdd(): void,
  handleInputFilter(event: React.ChangeEvent<HTMLInputElement>): void,
  handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>): void,
  options: string[][]
}

export interface IPageTable {
  tableHeads: string[],
  tableBody: string[][],
  handleEdit(item: string): void,
  handleRemove(value: string[]): void,
  popup: string[],
  popupText: string,
  handleConfirmRemove(value: string): void,
  handleDeclineRemove(): void,
  hasDetails?: boolean,
  handleDetails?(value: string): void,
  hasRentAndReturn?: boolean,
  handleRent?(value: string): void,
  handleReturn?(value: string): void
}

export interface IUsers {
  category: string,
  code: number,
  lastTime: string,
  name: string
}

export interface IUser {
  name: string,
  password: string,
  category: string
}

export interface IUsersPopup {
  title: string,
  options: string[][],
  handleYes(item?: IUser): void,
  handleNo(): void,
  startName: string,
  readonlyName: boolean,
  startCategory: string 
}

export interface IClients {
  CPF: string,
  lastVehicle: string[],
  name: string,
  status: boolean
}

export interface IClientsPopup {
  title: string,
  handleYes(value: (string | File | undefined)[]): void,
  handleNo(): void,
  clientName?: string,
  clientBirth?: string,
  clientCPF?: string,
  clientCNH?: string,
  clientPhone?: string,
  clientAdress?: string,
  editMode?: boolean
}

export interface IClient {
  name: string,
  birth: string,
  CPF: string,
  CNH: string,
  phone: string,
  address: string,
  file: File,
  history: string[][],
  securities: string[][]
}

export interface IClientDetailsPopup {
  detailsCpf: string,
  handleClose(): void
}

export interface IVehicles {
  rentValue: string,
  plate: string,
  model: string,
  status: boolean
}

export interface IVehicleDetails {
  category: string,
  model: string
  year: string,
  plate: string
  RENAVAM: string,
  IPVA: boolean,
  mileage: number,
  rent: {
    status: boolean,
    CPF: string,
    name: string,
    rentalDate: string,
    returnDate: string
  },
  securityValue: number,
  rentValue: number,
  oil: boolean,
  amount: number
}

export interface IVehiclesPopup {
  title: string,
  handleYes(vehicle: IVehicle): void,
  handleNo(): void,
  vehicleCategory: string,
  vehicleModel: string,
  vehicleYear: string,
  vehiclePlate: string,
  vehicleRenavam: string,
  vehicleIpva: string,
  vehicleMileage: string,
  vehiclSecuriteValue: string,
  vehicleRentValue: string,
  editMode?: boolean
}

export interface IVehicle {
  category: string,
  model: string,
  year: string,
  plate: string,
  RENAVAM: string,
  IPVA: string,
  mileage: string,
  securityValue: string,
  rentValue: string
}

export interface IVehicleDetailsPopup {
  plate: string,
  handleClose(): void
}

export interface IRent {
  CPF: string,
  name: string,
  plate: string,
  rentalDate: string,
  returnDate: string,
  security?: string,
  hasSecurity?: boolean,
  rentValue?: number,
  securityValue?: number
}

export interface IRentPopup {
  plate: string,
  handleNo(): void,
  handleYes(info: IRent): void
}

export interface IConfirmRent extends IRent {
  handleYes(info: IRent): void,
  handleNo(): void
}
