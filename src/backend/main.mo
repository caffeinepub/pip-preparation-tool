import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  var visitCount : Nat = 0;
  let pageCounters = Map.empty<Text, Nat>();

  public shared ({ caller }) func recordVisit() : async () {
    visitCount += 1;
  };

  public query ({ caller }) func getVisitCount() : async Nat {
    visitCount;
  };

  public shared ({ caller }) func recordPageVisit(page : Text) : async () {
    let count = switch (pageCounters.get(page)) {
      case (null) { 1 };
      case (?existing) { existing + 1 };
    };
    pageCounters.add(page, count);
  };

  public query ({ caller }) func getPageVisits() : async [(Text, Nat)] {
    pageCounters.toArray().sort(
      func(a, b) {
        Nat.compare(b.1, a.1);
      }
    );
  };
};

