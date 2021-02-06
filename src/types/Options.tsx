export interface WashOptions {
  washMethod: "machine" | "perm-press" | "delicate" | "hand" | "nowash";
  washTemp: "normal" | "30" | "40" | "50" | "60" | "70" | "95";
  washTempStyle: "dot" | "deg";
  washWringOk: boolean;
}

export interface BleachOptions {
  bleachMethod: "ok" | "no-bleach" | "non-chlorine";
}

export interface DryOptions {
  dryTumbleOk: boolean;
  dryTumbleMethod: "normal" | "perm-press" | "delicate";
  dryTumbleTemp: "any" | "low" | "medium" | "high" | "no-heat";
  dryAltOk: boolean;
  dryAltMethod: "line" | "drip" | "flat";
  dryAltShade: boolean;
}

export interface IronOptions {
  ironSteamOk: boolean;
  ironMethod: "no-iron" | "any" | "low" | "medium" | "high";
}

export interface DrycleanOptions {
  drycleanMethod:
    | "no-dryclean"
    | "dryclean-ok"
    | "any"
    | "no-tce"
    | "petroleum"
    | "wet";
  drycleanReduceMoisture: boolean;
  drycleanNoSteam: boolean;
  drycleanLowHeat: boolean;
  drycleanShortCycle: boolean;
  drycleanProcessIntensity: "normal" | "mild" | "very-mild";
  drycleanWetcleanOk: boolean;
}

export interface Options {
  wash: WashOptions;
  bleach: BleachOptions;
  dry: DryOptions;
  iron: IronOptions;
  dryclean: DrycleanOptions;
}
