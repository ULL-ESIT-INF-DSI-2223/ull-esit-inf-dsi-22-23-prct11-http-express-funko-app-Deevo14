import { FunkoPopType } from "./funkoPopType.js";
import { FunkoPopGenre } from "./funkoPopGenre.js";

/**
 * @class FunkoPop
 * @description This class represents a Funko Pop figure.
 */
export class FunkoPop {
  private id_: number;
  private name_: string;
  private description_: string;
  private type_: FunkoPopType;
  private genre_: FunkoPopGenre;
  private franchise_: string;
  private num_: number;
  private exclusive_: boolean;
  private specialFeatures_: string;
  private marketValue_: number;

  /**
   * @constructor
   * @param id unique identifier for the Funko Pop
   * @param name name of the Funko Pop
   * @param description description of the Funko Pop
   * @param type type of the Funko Pop
   * @param genre genre of the Funko Pop
   * @param franchise franchise of the Funko Pop
   * @param num number of the Funko Pop of the franchise
   * @param exclusive boolean value if the Funko Pop is exclusive
   * @param specialFeatures special features of the Funko Pop
   * @param marketValue market value of the Funko Pop
   */
  constructor(
    id: number,
    name: string,
    description: string,
    type: FunkoPopType,
    genre: FunkoPopGenre,
    franchise: string,
    num: number,
    exclusive: boolean,
    specialFeatures: string,
    marketValue: number
  ) {
    this.id_ = id;
    this.name_ = name;
    this.description_ = description;
    this.type_ = type;
    this.genre_ = genre;
    this.franchise_ = franchise;
    this.num_ = num;
    this.exclusive_ = exclusive;
    this.specialFeatures_ = specialFeatures;
    this.marketValue_ = marketValue;
  }
  /**
   * @description Getter for id
   */
  get ID(): number {
    return this.id_;
  }

  /**
   * @description Setter for id
   */
  set ID(id: number) {
    this.id_ = id;
  }

  /**
   * @description Getter for name
   */
  get Name(): string {
    return this.name_;
  }

  /**
   * @description Setter for name
   */
  set Name(name: string) {
    this.name_ = name;
  }

  /**
   * @description Getter for description
   */
  get Description(): string {
    return this.description_;
  }

  /**
   * @description Setter for description
   */
  set Description(description: string) {
    this.description_ = description;
  }

  /**
   * @description Getter for type
   */
  get Type(): FunkoPopType {
    return this.type_;
  }

  /**
   * @description Setter for type
   */
  set Type(type: FunkoPopType) {
    this.type_ = type;
  }

  /**
   * @description Getter for genre
   */
  get Genre(): FunkoPopGenre {
    return this.genre_;
  }

  /**
   * @description Setter for genre
   */
  set Genre(genre: FunkoPopGenre) {
    this.genre_ = genre;
  }

  /**
   * @description Getter for franchise
   */
  get Franchise(): string {
    return this.franchise_;
  }

  /**
   * @description Setter for franchise
   */
  set Franchise(franchise: string) {
    this.franchise_ = franchise;
  }

  /**
   * @description Getter for num
   */
  get Num(): number {
    return this.num_;
  }

  /**
   * @description Setter for num
   */
  set Num(num: number) {
    this.num_ = num;
  }

  /**
   * @description Getter for exclusive
   */
  get Exclusive(): boolean {
    return this.exclusive_;
  }

  /**
   * @description Setter for exclusive
   */
  set Exclusive(exclusive: boolean) {
    this.exclusive_ = exclusive;
  }

  /**
   * @description Getter for specialFeatures
   */
  get SpecialFeatures(): string {
    return this.specialFeatures_;
  }

  /**
   * @description Setter for specialFeatures
   */
  set SpecialFeatures(specialFeatures: string) {
    this.specialFeatures_ = specialFeatures;
  }

  /**
   * @description Getter for marketValue
   */
  get MarketValue(): number {
    return this.marketValue_;
  }

  /**
   * @description Setter for marketValue
   */
  set MarketValue(marketValue: number) {
    this.marketValue_ = marketValue;
  }
}
