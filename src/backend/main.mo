import Text "mo:core/Text";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";

actor {
  // Run this in canister and only call it on publishing of project (never on every user visit)
  public shared ({ caller }) func validateCustomDomain(_ : Text) : async () {};
};
