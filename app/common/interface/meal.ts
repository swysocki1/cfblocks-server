export class IMeal {
  eatenBy: string;
  eatenDate: Date = new Date();
  food?: string;
  eatenAmount: number;
  constructor(meal: {
    eatenBy: string;
    eatenDate: Date;
    food?: string;
    eatenAmount: number;
  }) {
    this.eatenBy = meal.eatenBy;
    this.eatenDate = meal.eatenDate;
    this.food = meal.food;
    this.eatenAmount = meal.eatenAmount;
  }
}
