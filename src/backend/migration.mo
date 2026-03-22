import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type OldActor = {
    visitCount : Nat;
  };

  type NewActor = {
    visitCount : Nat;
    pageCounters : Map.Map<Text, Nat>;
  };

  public func run(old : OldActor) : NewActor {
    { old with pageCounters = Map.empty() };
  };
};

