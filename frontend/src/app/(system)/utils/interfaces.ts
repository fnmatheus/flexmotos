export interface IPopup {
  title: string,
  handleYes(value?: number): void,
  handleNo(): void,
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

export interface IRentedVehicles {
  category: string,
  plate: string,
  model: string,
  status: boolean
}

export interface IVehicliesDetails {
  rent: {
    returnDate: string
  }
}

export interface IDashboardTable {
  tableTitle: string,
  vehicles: string[][],
  hasButton?: boolean,
  buttonText?: string,
  handleButton(vahicle: string[]): void,
  hasThirdText?: boolean,
  hasPopup?: boolean,
  popup: string[],
  popuptext: string,
  handleYes(): void,
  handleNo(): void
}
