import Text "mo:core/Text";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";

actor {
  // Run this in canister and only call it on publishing of project (never on every user visit)
  public shared ({ caller }) func validateCustomDomain(domain : Text) : async () {
    validateDomainLength(domain);
    validateDomainCharacters(domain);
    checkNoTrailingHyphen(domain);
  };

  func validateDomainLength(domain : Text) {
    let len = domain.size();
    if (len < 5 or len > 50) {
      Runtime.trap(
        "Domain must be between 5 and 50 characters. Your current domain has " # len.toText() # " characters.",
      );
    };
  };

  func checkNoTrailingHyphen(domain : Text) {
    let chars = domain.toArray(); // Convert Text to array
    if (chars.size() == 0) {
      Runtime.trap("Domain name cannot be empty. ");
    };
    let len = chars.size(); // Get the size of the array
    if (chars[len - 1] == '-') {
      Runtime.trap("Domain cannot end with a hyphen. ");
    };
  };

  func validateDomainCharacters(domain : Text) {
    let isValid = domain.toArray().all(
      func(c) {
        switch (c.toNat32()) {
          // Lowercase a-z
          case (val) { if (val >= 0x61 and val <= 0x7A) { return true } };
          // Uppercase A-Z
          case (val) { if (val >= 0x41 and val <= 0x5A) { return true } };
          // Digits 0-9
          case (val) { if (val >= 0x30 and val <= 0x39) { return true } };
          // Hyphen
          case (0x2D) { return true };
          // Anything else (including space)
          case (_) { return false };
        };
        false;
      }
    );

    if (not isValid) {
      Runtime.trap("Domain can only contain letters, numbers, and hyphens. Please remove spaces and special characters.");
    };
  };
};
