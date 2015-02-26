parser = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = peg$FAILED,
        peg$c2 = "\n",
        peg$c3 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c4 = function(op) { return op },
        peg$c5 = /^[0-9]/,
        peg$c6 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c7 = function(digits) {
        	return {
        		type: "int",
        		value: parseInt(digits.join(""), 10)
        	}
        },
        peg$c8 = "#data",
        peg$c9 = { type: "literal", value: "#data", description: "\"#data\"" },
        peg$c10 = null,
        peg$c11 = " ",
        peg$c12 = { type: "literal", value: " ", description: "\" \"" },
        peg$c13 = ":",
        peg$c14 = { type: "literal", value: ":", description: "\":\"" },
        peg$c15 = "=",
        peg$c16 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c17 = ",",
        peg$c18 = { type: "literal", value: ",", description: "\",\"" },
        peg$c19 = function(left, array) {
        	return {
        		type: "data",
        		array: array ? array.map(function(array) { return array[2] }) : null
        	}
        },
        peg$c20 = "#type",
        peg$c21 = { type: "literal", value: "#type", description: "\"#type\"" },
        peg$c22 = /^[A-Za-z0-9?]/,
        peg$c23 = { type: "class", value: "[A-Za-z0-9?]", description: "[A-Za-z0-9?]" },
        peg$c24 = function(left, right) {
        	return {
        		type: "type",
        		value: right.join("")
        	}
        },
        peg$c25 = "#color",
        peg$c26 = { type: "literal", value: "#color", description: "\"#color\"" },
        peg$c27 = "#",
        peg$c28 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c29 = function(left, right) {
        	return {
        		type: "color",
        		value: right.join("")
        	}
        },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3, s4;

      s0 = [];
      s1 = peg$currPos;
      s2 = peg$parsevalue();
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.charCodeAt(peg$currPos) === 10) {
          s4 = peg$c2;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c3); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.charCodeAt(peg$currPos) === 10) {
            s4 = peg$c2;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
        }
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s1;
          s2 = peg$c4(s2);
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c1;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$currPos;
          s2 = peg$parsevalue();
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (input.charCodeAt(peg$currPos) === 10) {
              s4 = peg$c2;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c3); }
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (input.charCodeAt(peg$currPos) === 10) {
                s4 = peg$c2;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c3); }
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s1;
              s2 = peg$c4(s2);
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c1;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c1;
          }
        }
      } else {
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsevalue() {
      var s0;

      s0 = peg$parsedata();
      if (s0 === peg$FAILED) {
        s0 = peg$parsechartType();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecolor();
          if (s0 === peg$FAILED) {
            s0 = peg$parseint();
          }
        }
      }

      return s0;
    }

    function peg$parseint() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c5.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c5.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c7(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsedata() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = [];
      if (input.substr(peg$currPos, 5) === peg$c8) {
        s2 = peg$c8;
        peg$currPos += 5;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.substr(peg$currPos, 5) === peg$c8) {
            s2 = peg$c8;
            peg$currPos += 5;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c11;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c10;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c13;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c10;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c15;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c16); }
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c10;
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c17;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c18); }
              }
              if (s7 === peg$FAILED) {
                s7 = peg$c10;
              }
              if (s7 !== peg$FAILED) {
                s8 = [];
                if (input.charCodeAt(peg$currPos) === 32) {
                  s9 = peg$c11;
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c12); }
                }
                while (s9 !== peg$FAILED) {
                  s8.push(s9);
                  if (input.charCodeAt(peg$currPos) === 32) {
                    s9 = peg$c11;
                    peg$currPos++;
                  } else {
                    s9 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c12); }
                  }
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseint();
                  if (s9 !== peg$FAILED) {
                    s7 = [s7, s8, s9];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$c1;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$c1;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$c1;
              }
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s7 = peg$c17;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c18); }
                  }
                  if (s7 === peg$FAILED) {
                    s7 = peg$c10;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = [];
                    if (input.charCodeAt(peg$currPos) === 32) {
                      s9 = peg$c11;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c12); }
                    }
                    while (s9 !== peg$FAILED) {
                      s8.push(s9);
                      if (input.charCodeAt(peg$currPos) === 32) {
                        s9 = peg$c11;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c12); }
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseint();
                      if (s9 !== peg$FAILED) {
                        s7 = [s7, s8, s9];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$c1;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$c1;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$c1;
                  }
                }
              } else {
                s5 = peg$c1;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c10;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c19(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsechartType() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = [];
      if (input.substr(peg$currPos, 5) === peg$c20) {
        s2 = peg$c20;
        peg$currPos += 5;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.substr(peg$currPos, 5) === peg$c20) {
            s2 = peg$c20;
            peg$currPos += 5;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c21); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c11;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c10;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c13;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c10;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c15;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c16); }
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c10;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 32) {
                s5 = peg$c11;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c12); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c10;
              }
              if (s5 !== peg$FAILED) {
                s6 = [];
                if (peg$c22.test(input.charAt(peg$currPos))) {
                  s7 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c23); }
                }
                if (s7 !== peg$FAILED) {
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    if (peg$c22.test(input.charAt(peg$currPos))) {
                      s7 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c23); }
                    }
                  }
                } else {
                  s6 = peg$c1;
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c24(s1, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsecolor() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = [];
      if (input.substr(peg$currPos, 6) === peg$c25) {
        s2 = peg$c25;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.substr(peg$currPos, 6) === peg$c25) {
            s2 = peg$c25;
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c11;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c10;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c13;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c10;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c15;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c16); }
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c10;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 32) {
                s5 = peg$c11;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c12); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c10;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 35) {
                  s6 = peg$c27;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c28); }
                }
                if (s6 === peg$FAILED) {
                  s6 = peg$c10;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  if (peg$c22.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c23); }
                  }
                  if (s8 !== peg$FAILED) {
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      if (peg$c22.test(input.charAt(peg$currPos))) {
                        s8 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c23); }
                      }
                    }
                  } else {
                    s7 = peg$c1;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c29(s1, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();