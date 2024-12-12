(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Lunr languages, `French` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.fr = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.fr.trimmer,
        lunr.fr.stopWordFilter,
        lunr.fr.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.fr.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.fr.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.fr.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.fr.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.fr.trimmer, 'trimmer-fr');

    /* lunr stemmer function */
    lunr.fr.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function FrenchStemmer() {
          var a_0 = [new Among("col", -1, -1), new Among("par", -1, -1),
              new Among("tap", -1, -1)
            ],
            a_1 = [new Among("", -1, 4),
              new Among("I", 0, 1), new Among("U", 0, 2), new Among("Y", 0, 3)
            ],
            a_2 = [
              new Among("iqU", -1, 3), new Among("abl", -1, 3),
              new Among("I\u00E8r", -1, 4), new Among("i\u00E8r", -1, 4),
              new Among("eus", -1, 2), new Among("iv", -1, 1)
            ],
            a_3 = [
              new Among("ic", -1, 2), new Among("abil", -1, 1),
              new Among("iv", -1, 3)
            ],
            a_4 = [new Among("iqUe", -1, 1),
              new Among("atrice", -1, 2), new Among("ance", -1, 1),
              new Among("ence", -1, 5), new Among("logie", -1, 3),
              new Among("able", -1, 1), new Among("isme", -1, 1),
              new Among("euse", -1, 11), new Among("iste", -1, 1),
              new Among("ive", -1, 8), new Among("if", -1, 8),
              new Among("usion", -1, 4), new Among("ation", -1, 2),
              new Among("ution", -1, 4), new Among("ateur", -1, 2),
              new Among("iqUes", -1, 1), new Among("atrices", -1, 2),
              new Among("ances", -1, 1), new Among("ences", -1, 5),
              new Among("logies", -1, 3), new Among("ables", -1, 1),
              new Among("ismes", -1, 1), new Among("euses", -1, 11),
              new Among("istes", -1, 1), new Among("ives", -1, 8),
              new Among("ifs", -1, 8), new Among("usions", -1, 4),
              new Among("ations", -1, 2), new Among("utions", -1, 4),
              new Among("ateurs", -1, 2), new Among("ments", -1, 15),
              new Among("ements", 30, 6), new Among("issements", 31, 12),
              new Among("it\u00E9s", -1, 7), new Among("ment", -1, 15),
              new Among("ement", 34, 6), new Among("issement", 35, 12),
              new Among("amment", 34, 13), new Among("emment", 34, 14),
              new Among("aux", -1, 10), new Among("eaux", 39, 9),
              new Among("eux", -1, 1), new Among("it\u00E9", -1, 7)
            ],
            a_5 = [
              new Among("ira", -1, 1), new Among("ie", -1, 1),
              new Among("isse", -1, 1), new Among("issante", -1, 1),
              new Among("i", -1, 1), new Among("irai", 4, 1),
              new Among("ir", -1, 1), new Among("iras", -1, 1),
              new Among("ies", -1, 1), new Among("\u00EEmes", -1, 1),
              new Among("isses", -1, 1), new Among("issantes", -1, 1),
              new Among("\u00EEtes", -1, 1), new Among("is", -1, 1),
              new Among("irais", 13, 1), new Among("issais", 13, 1),
              new Among("irions", -1, 1), new Among("issions", -1, 1),
              new Among("irons", -1, 1), new Among("issons", -1, 1),
              new Among("issants", -1, 1), new Among("it", -1, 1),
              new Among("irait", 21, 1), new Among("issait", 21, 1),
              new Among("issant", -1, 1), new Among("iraIent", -1, 1),
              new Among("issaIent", -1, 1), new Among("irent", -1, 1),
              new Among("issent", -1, 1), new Among("iront", -1, 1),
              new Among("\u00EEt", -1, 1), new Among("iriez", -1, 1),
              new Among("issiez", -1, 1), new Among("irez", -1, 1),
              new Among("issez", -1, 1)
            ],
            a_6 = [new Among("a", -1, 3),
              new Among("era", 0, 2), new Among("asse", -1, 3),
              new Among("ante", -1, 3), new Among("\u00E9e", -1, 2),
              new Among("ai", -1, 3), new Among("erai", 5, 2),
              new Among("er", -1, 2), new Among("as", -1, 3),
              new Among("eras", 8, 2), new Among("\u00E2mes", -1, 3),
              new Among("asses", -1, 3), new Among("antes", -1, 3),
              new Among("\u00E2tes", -1, 3), new Among("\u00E9es", -1, 2),
              new Among("ais", -1, 3), new Among("erais", 15, 2),
              new Among("ions", -1, 1), new Among("erions", 17, 2),
              new Among("assions", 17, 3), new Among("erons", -1, 2),
              new Among("ants", -1, 3), new Among("\u00E9s", -1, 2),
              new Among("ait", -1, 3), new Among("erait", 23, 2),
              new Among("ant", -1, 3), new Among("aIent", -1, 3),
              new Among("eraIent", 26, 2), new Among("\u00E8rent", -1, 2),
              new Among("assent", -1, 3), new Among("eront", -1, 2),
              new Among("\u00E2t", -1, 3), new Among("ez", -1, 2),
              new Among("iez", 32, 2), new Among("eriez", 33, 2),
              new Among("assiez", 33, 3), new Among("erez", 32, 2),
              new Among("\u00E9", -1, 2)
            ],
            a_7 = [new Among("e", -1, 3),
              new Among("I\u00E8re", 0, 2), new Among("i\u00E8re", 0, 2),
              new Among("ion", -1, 1), new Among("Ier", -1, 2),
              new Among("ier", -1, 2), new Among("\u00EB", -1, 4)
            ],
            a_8 = [
              new Among("ell", -1, -1), new Among("eill", -1, -1),
              new Among("enn", -1, -1), new Among("onn", -1, -1),
              new Among("ett", -1, -1)
            ],
            g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 128, 130, 103, 8, 5
            ],
            g_keep_with_s = [1, 65, 20, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
            ],
            I_p2, I_p1, I_pV, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function habr1(c1, c2, v_1) {
            if (sbp.eq_s(1, c1)) {
              sbp.ket = sbp.cursor;
              if (sbp.in_grouping(g_v, 97, 251)) {
                sbp.slice_from(c2);
                sbp.cursor = v_1;
                return true;
              }
            }
            return false;
          }

          function habr2(c1, c2, v_1) {
            if (sbp.eq_s(1, c1)) {
              sbp.ket = sbp.cursor;
              sbp.slice_from(c2);
              sbp.cursor = v_1;
              return true;
            }
            return false;
          }

          function r_prelude() {
            var v_1, v_2;
            while (true) {
              v_1 = sbp.cursor;
              if (sbp.in_grouping(g_v, 97, 251)) {
                sbp.bra = sbp.cursor;
                v_2 = sbp.cursor;
                if (habr1("u", "U", v_1))
                  continue;
                sbp.cursor = v_2;
                if (habr1("i", "I", v_1))
                  continue;
                sbp.cursor = v_2;
                if (habr2("y", "Y", v_1))
                  continue;
              }
              sbp.cursor = v_1;
              sbp.bra = v_1;
              if (!habr1("y", "Y", v_1)) {
                sbp.cursor = v_1;
                if (sbp.eq_s(1, "q")) {
                  sbp.bra = sbp.cursor;
                  if (habr2("u", "U", v_1))
                    continue;
                }
                sbp.cursor = v_1;
                if (v_1 >= sbp.limit)
                  return;
                sbp.cursor++;
              }
            }
          }

          function habr3() {
            while (!sbp.in_grouping(g_v, 97, 251)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            while (!sbp.out_grouping(g_v, 97, 251)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            return false;
          }

          function r_mark_regions() {
            var v_1 = sbp.cursor;
            I_pV = sbp.limit;
            I_p1 = I_pV;
            I_p2 = I_pV;
            if (sbp.in_grouping(g_v, 97, 251) && sbp.in_grouping(g_v, 97, 251) &&
              sbp.cursor < sbp.limit)
              sbp.cursor++;
            else {
              sbp.cursor = v_1;
              if (!sbp.find_among(a_0, 3)) {
                sbp.cursor = v_1;
                do {
                  if (sbp.cursor >= sbp.limit) {
                    sbp.cursor = I_pV;
                    break;
                  }
                  sbp.cursor++;
                } while (!sbp.in_grouping(g_v, 97, 251));
              }
            }
            I_pV = sbp.cursor;
            sbp.cursor = v_1;
            if (!habr3()) {
              I_p1 = sbp.cursor;
              if (!habr3())
                I_p2 = sbp.cursor;
            }
          }

          function r_postlude() {
            var among_var, v_1;
            while (true) {
              v_1 = sbp.cursor;
              sbp.bra = v_1;
              among_var = sbp.find_among(a_1, 4);
              if (!among_var)
                break;
              sbp.ket = sbp.cursor;
              switch (among_var) {
                case 1:
                  sbp.slice_from("i");
                  break;
                case 2:
                  sbp.slice_from("u");
                  break;
                case 3:
                  sbp.slice_from("y");
                  break;
                case 4:
                  if (sbp.cursor >= sbp.limit)
                    return;
                  sbp.cursor++;
                  break;
              }
            }
          }

          function r_RV() {
            return I_pV <= sbp.cursor;
          }

          function r_R1() {
            return I_p1 <= sbp.cursor;
          }

          function r_R2() {
            return I_p2 <= sbp.cursor;
          }

          function r_standard_suffix() {
            var among_var, v_1;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_4, 43);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  if (!r_R2())
                    return false;
                  sbp.slice_del();
                  break;
                case 2:
                  if (!r_R2())
                    return false;
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  if (sbp.eq_s_b(2, "ic")) {
                    sbp.bra = sbp.cursor;
                    if (!r_R2())
                      sbp.slice_from("iqU");
                    else
                      sbp.slice_del();
                  }
                  break;
                case 3:
                  if (!r_R2())
                    return false;
                  sbp.slice_from("log");
                  break;
                case 4:
                  if (!r_R2())
                    return false;
                  sbp.slice_from("u");
                  break;
                case 5:
                  if (!r_R2())
                    return false;
                  sbp.slice_from("ent");
                  break;
                case 6:
                  if (!r_RV())
                    return false;
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  among_var = sbp.find_among_b(a_2, 6);
                  if (among_var) {
                    sbp.bra = sbp.cursor;
                    switch (among_var) {
                      case 1:
                        if (r_R2()) {
                          sbp.slice_del();
                          sbp.ket = sbp.cursor;
                          if (sbp.eq_s_b(2, "at")) {
                            sbp.bra = sbp.cursor;
                            if (r_R2())
                              sbp.slice_del();
                          }
                        }
                        break;
                      case 2:
                        if (r_R2())
                          sbp.slice_del();
                        else if (r_R1())
                          sbp.slice_from("eux");
                        break;
                      case 3:
                        if (r_R2())
                          sbp.slice_del();
                        break;
                      case 4:
                        if (r_RV())
                          sbp.slice_from("i");
                        break;
                    }
                  }
                  break;
                case 7:
                  if (!r_R2())
                    return false;
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  among_var = sbp.find_among_b(a_3, 3);
                  if (among_var) {
                    sbp.bra = sbp.cursor;
                    switch (among_var) {
                      case 1:
                        if (r_R2())
                          sbp.slice_del();
                        else
                          sbp.slice_from("abl");
                        break;
                      case 2:
                        if (r_R2())
                          sbp.slice_del();
                        else
                          sbp.slice_from("iqU");
                        break;
                      case 3:
                        if (r_R2())
                          sbp.slice_del();
                        break;
                    }
                  }
                  break;
                case 8:
                  if (!r_R2())
                    return false;
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  if (sbp.eq_s_b(2, "at")) {
                    sbp.bra = sbp.cursor;
                    if (r_R2()) {
                      sbp.slice_del();
                      sbp.ket = sbp.cursor;
                      if (sbp.eq_s_b(2, "ic")) {
                        sbp.bra = sbp.cursor;
                        if (r_R2())
                          sbp.slice_del();
                        else
                          sbp.slice_from("iqU");
                        break;
                      }
                    }
                  }
                  break;
                case 9:
                  sbp.slice_from("eau");
                  break;
                case 10:
                  if (!r_R1())
                    return false;
                  sbp.slice_from("al");
                  break;
                case 11:
                  if (r_R2())
                    sbp.slice_del();
                  else if (!r_R1())
                    return false;
                  else
                    sbp.slice_from("eux");
                  break;
                case 12:
                  if (!r_R1() || !sbp.out_grouping_b(g_v, 97, 251))
                    return false;
                  sbp.slice_del();
                  break;
                case 13:
                  if (r_RV())
                    sbp.slice_from("ant");
                  return false;
                case 14:
                  if (r_RV())
                    sbp.slice_from("ent");
                  return false;
                case 15:
                  v_1 = sbp.limit - sbp.cursor;
                  if (sbp.in_grouping_b(g_v, 97, 251) && r_RV()) {
                    sbp.cursor = sbp.limit - v_1;
                    sbp.slice_del();
                  }
                  return false;
              }
              return true;
            }
            return false;
          }

          function r_i_verb_suffix() {
            var among_var, v_1;
            if (sbp.cursor < I_pV)
              return false;
            v_1 = sbp.limit_backward;
            sbp.limit_backward = I_pV;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_5, 35);
            if (!among_var) {
              sbp.limit_backward = v_1;
              return false;
            }
            sbp.bra = sbp.cursor;
            if (among_var == 1) {
              if (!sbp.out_grouping_b(g_v, 97, 251)) {
                sbp.limit_backward = v_1;
                return false;
              }
              sbp.slice_del();
            }
            sbp.limit_backward = v_1;
            return true;
          }

          function r_verb_suffix() {
            var among_var, v_2, v_3;
            if (sbp.cursor < I_pV)
              return false;
            v_2 = sbp.limit_backward;
            sbp.limit_backward = I_pV;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_6, 38);
            if (!among_var) {
              sbp.limit_backward = v_2;
              return false;
            }
            sbp.bra = sbp.cursor;
            switch (among_var) {
              case 1:
                if (!r_R2()) {
                  sbp.limit_backward = v_2;
                  return false;
                }
                sbp.slice_del();
                break;
              case 2:
                sbp.slice_del();
                break;
              case 3:
                sbp.slice_del();
                v_3 = sbp.limit - sbp.cursor;
                sbp.ket = sbp.cursor;
                if (sbp.eq_s_b(1, "e")) {
                  sbp.bra = sbp.cursor;
                  sbp.slice_del();
                } else
                  sbp.cursor = sbp.limit - v_3;
                break;
            }
            sbp.limit_backward = v_2;
            return true;
          }

          function r_residual_suffix() {
            var among_var, v_1 = sbp.limit - sbp.cursor,
              v_2, v_4, v_5;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(1, "s")) {
              sbp.bra = sbp.cursor;
              v_2 = sbp.limit - sbp.cursor;
              if (sbp.out_grouping_b(g_keep_with_s, 97, 232)) {
                sbp.cursor = sbp.limit - v_2;
                sbp.slice_del();
              } else
                sbp.cursor = sbp.limit - v_1;
            } else
              sbp.cursor = sbp.limit - v_1;
            if (sbp.cursor >= I_pV) {
              v_4 = sbp.limit_backward;
              sbp.limit_backward = I_pV;
              sbp.ket = sbp.cursor;
              among_var = sbp.find_among_b(a_7, 7);
              if (among_var) {
                sbp.bra = sbp.cursor;
                switch (among_var) {
                  case 1:
                    if (r_R2()) {
                      v_5 = sbp.limit - sbp.cursor;
                      if (!sbp.eq_s_b(1, "s")) {
                        sbp.cursor = sbp.limit - v_5;
                        if (!sbp.eq_s_b(1, "t"))
                          break;
                      }
                      sbp.slice_del();
                    }
                    break;
                  case 2:
                    sbp.slice_from("i");
                    break;
                  case 3:
                    sbp.slice_del();
                    break;
                  case 4:
                    if (sbp.eq_s_b(2, "gu"))
                      sbp.slice_del();
                    break;
                }
              }
              sbp.limit_backward = v_4;
            }
          }

          function r_un_double() {
            var v_1 = sbp.limit - sbp.cursor;
            if (sbp.find_among_b(a_8, 5)) {
              sbp.cursor = sbp.limit - v_1;
              sbp.ket = sbp.cursor;
              if (sbp.cursor > sbp.limit_backward) {
                sbp.cursor--;
                sbp.bra = sbp.cursor;
                sbp.slice_del();
              }
            }
          }

          function r_un_accent() {
            var v_1, v_2 = 1;
            while (sbp.out_grouping_b(g_v, 97, 251))
              v_2--;
            if (v_2 <= 0) {
              sbp.ket = sbp.cursor;
              v_1 = sbp.limit - sbp.cursor;
              if (!sbp.eq_s_b(1, "\u00E9")) {
                sbp.cursor = sbp.limit - v_1;
                if (!sbp.eq_s_b(1, "\u00E8"))
                  return;
              }
              sbp.bra = sbp.cursor;
              sbp.slice_from("e");
            }
          }

          function habr5() {
            if (!r_standard_suffix()) {
              sbp.cursor = sbp.limit;
              if (!r_i_verb_suffix()) {
                sbp.cursor = sbp.limit;
                if (!r_verb_suffix()) {
                  sbp.cursor = sbp.limit;
                  r_residual_suffix();
                  return;
                }
              }
            }
            sbp.cursor = sbp.limit;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(1, "Y")) {
              sbp.bra = sbp.cursor;
              sbp.slice_from("i");
            } else {
              sbp.cursor = sbp.limit;
              if (sbp.eq_s_b(1, "\u00E7")) {
                sbp.bra = sbp.cursor;
                sbp.slice_from("c");
              }
            }
          }
          this.stem = function() {
            var v_1 = sbp.cursor;
            r_prelude();
            sbp.cursor = v_1;
            r_mark_regions();
            sbp.limit_backward = v_1;
            sbp.cursor = sbp.limit;
            habr5();
            sbp.cursor = sbp.limit;
            r_un_double();
            sbp.cursor = sbp.limit;
            r_un_accent();
            sbp.cursor = sbp.limit_backward;
            r_postlude();
            return true;
          }
        };

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === "function") {
          return token.update(function(word) {
            st.setCurrent(word);
            st.stem();
            return st.getCurrent();
          })
        } else { // for lunr version <= 1
          st.setCurrent(token);
          st.stem();
          return st.getCurrent();
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.fr.stemmer, 'stemmer-fr');

    lunr.fr.stopWordFilter = lunr.generateStopWordFilter('ai aie aient aies ait as au aura aurai auraient aurais aurait auras aurez auriez aurions aurons auront aux avaient avais avait avec avez aviez avions avons ayant ayez ayons c ce ceci celà ces cet cette d dans de des du elle en es est et eu eue eues eurent eus eusse eussent eusses eussiez eussions eut eux eûmes eût eûtes furent fus fusse fussent fusses fussiez fussions fut fûmes fût fûtes ici il ils j je l la le les leur leurs lui m ma mais me mes moi mon même n ne nos notre nous on ont ou par pas pour qu que quel quelle quelles quels qui s sa sans se sera serai seraient serais serait seras serez seriez serions serons seront ses soi soient sois soit sommes son sont soyez soyons suis sur t ta te tes toi ton tu un une vos votre vous y à étaient étais était étant étiez étions été étée étées étés êtes'.split(' '));

    lunr.Pipeline.registerFunction(lunr.fr.stopWordFilter, 'stopWordFilter-fr');
  };
}))
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var rh = global.rh;
var lunrlang = require('../../node_modules/lunr-languages/lunr.fr');
rh._.exports(lunrlang);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../node_modules/lunr-languages/lunr.fr":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbHVuci1sYW5ndWFnZXMvbHVuci5mci5qcyIsInNyYy9sYW5ndWFnZXMvZnIuanM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOXJCQSxJQUFJLEtBQUssT0FBTyxFQUFoQjtBQUNBLElBQUksV0FBVyxRQUFRLDJDQUFSLENBQWY7QUFDQSxHQUFHLENBQUgsQ0FBSyxPQUFMLENBQWMsUUFBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIVxuICogTHVuciBsYW5ndWFnZXMsIGBGcmVuY2hgIGxhbmd1YWdlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTWloYWlWYWxlbnRpbi9sdW5yLWxhbmd1YWdlc1xuICpcbiAqIENvcHlyaWdodCAyMDE0LCBNaWhhaSBWYWxlbnRpblxuICogaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9NUEwvXG4gKi9cbi8qIVxuICogYmFzZWQgb25cbiAqIFNub3diYWxsIEphdmFTY3JpcHQgTGlicmFyeSB2MC4zXG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvdXJpbS9cbiAqIGh0dHA6Ly9zbm93YmFsbC50YXJ0YXJ1cy5vcmcvXG4gKlxuICogQ29weXJpZ2h0IDIwMTAsIE9sZWcgTWF6a29cbiAqIGh0dHA6Ly93d3cubW96aWxsYS5vcmcvTVBML1xuICovXG5cbi8qKlxuICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICogRXhwb3J0IGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3JldHVybkV4cG9ydHMuanNcbiAqL1xuO1xuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZmFjdG9yeSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvKipcbiAgICAgKiBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgKiBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgKiBsaWtlIE5vZGUuXG4gICAgICovXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIGZhY3RvcnkoKShyb290Lmx1bnIpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuICAvKipcbiAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAqIFRoaXMgZXhhbXBsZSByZXR1cm5zIGFuIG9iamVjdCwgYnV0IHRoZSBtb2R1bGVcbiAgICogY2FuIHJldHVybiBhIGZ1bmN0aW9uIGFzIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbihsdW5yKSB7XG4gICAgLyogdGhyb3cgZXJyb3IgaWYgbHVuciBpcyBub3QgeWV0IGluY2x1ZGVkICovXG4gICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgbHVucikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMdW5yIGlzIG5vdCBwcmVzZW50LiBQbGVhc2UgaW5jbHVkZSAvIHJlcXVpcmUgTHVuciBiZWZvcmUgdGhpcyBzY3JpcHQuJyk7XG4gICAgfVxuXG4gICAgLyogdGhyb3cgZXJyb3IgaWYgbHVuciBzdGVtbWVyIHN1cHBvcnQgaXMgbm90IHlldCBpbmNsdWRlZCAqL1xuICAgIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIGx1bnIuc3RlbW1lclN1cHBvcnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTHVuciBzdGVtbWVyIHN1cHBvcnQgaXMgbm90IHByZXNlbnQuIFBsZWFzZSBpbmNsdWRlIC8gcmVxdWlyZSBMdW5yIHN0ZW1tZXIgc3VwcG9ydCBiZWZvcmUgdGhpcyBzY3JpcHQuJyk7XG4gICAgfVxuXG4gICAgLyogcmVnaXN0ZXIgc3BlY2lmaWMgbG9jYWxlIGZ1bmN0aW9uICovXG4gICAgbHVuci5mciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5waXBlbGluZS5yZXNldCgpO1xuICAgICAgdGhpcy5waXBlbGluZS5hZGQoXG4gICAgICAgIGx1bnIuZnIudHJpbW1lcixcbiAgICAgICAgbHVuci5mci5zdG9wV29yZEZpbHRlcixcbiAgICAgICAgbHVuci5mci5zdGVtbWVyXG4gICAgICApO1xuXG4gICAgICAvLyBmb3IgbHVuciB2ZXJzaW9uIDJcbiAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNvIHRoYXQgZXZlcnkgc2VhcmNoZWQgd29yZCBpcyBhbHNvIHN0ZW1tZWQgYmVmb3JlXG4gICAgICAvLyBpbiBsdW5yIDw9IDEgdGhpcyBpcyBub3QgbmVlZGVkLCBhcyBpdCBpcyBkb25lIHVzaW5nIHRoZSBub3JtYWwgcGlwZWxpbmVcbiAgICAgIGlmICh0aGlzLnNlYXJjaFBpcGVsaW5lKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGlwZWxpbmUucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hQaXBlbGluZS5hZGQobHVuci5mci5zdGVtbWVyKVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKiBsdW5yIHRyaW1tZXIgZnVuY3Rpb24gKi9cbiAgICBsdW5yLmZyLndvcmRDaGFyYWN0ZXJzID0gXCJBLVphLXpcXHhBQVxceEJBXFx4QzAtXFx4RDZcXHhEOC1cXHhGNlxceEY4LVxcdTAyQjhcXHUwMkUwLVxcdTAyRTRcXHUxRDAwLVxcdTFEMjVcXHUxRDJDLVxcdTFENUNcXHUxRDYyLVxcdTFENjVcXHUxRDZCLVxcdTFENzdcXHUxRDc5LVxcdTFEQkVcXHUxRTAwLVxcdTFFRkZcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMkFcXHUyMTJCXFx1MjEzMlxcdTIxNEVcXHUyMTYwLVxcdTIxODhcXHUyQzYwLVxcdTJDN0ZcXHVBNzIyLVxcdUE3ODdcXHVBNzhCLVxcdUE3QURcXHVBN0IwLVxcdUE3QjdcXHVBN0Y3LVxcdUE3RkZcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNjRcXHVGQjAwLVxcdUZCMDZcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcIjtcbiAgICBsdW5yLmZyLnRyaW1tZXIgPSBsdW5yLnRyaW1tZXJTdXBwb3J0LmdlbmVyYXRlVHJpbW1lcihsdW5yLmZyLndvcmRDaGFyYWN0ZXJzKTtcblxuICAgIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLmZyLnRyaW1tZXIsICd0cmltbWVyLWZyJyk7XG5cbiAgICAvKiBsdW5yIHN0ZW1tZXIgZnVuY3Rpb24gKi9cbiAgICBsdW5yLmZyLnN0ZW1tZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAvKiBjcmVhdGUgdGhlIHdyYXBwZWQgc3RlbW1lciBvYmplY3QgKi9cbiAgICAgIHZhciBBbW9uZyA9IGx1bnIuc3RlbW1lclN1cHBvcnQuQW1vbmcsXG4gICAgICAgIFNub3diYWxsUHJvZ3JhbSA9IGx1bnIuc3RlbW1lclN1cHBvcnQuU25vd2JhbGxQcm9ncmFtLFxuICAgICAgICBzdCA9IG5ldyBmdW5jdGlvbiBGcmVuY2hTdGVtbWVyKCkge1xuICAgICAgICAgIHZhciBhXzAgPSBbbmV3IEFtb25nKFwiY29sXCIsIC0xLCAtMSksIG5ldyBBbW9uZyhcInBhclwiLCAtMSwgLTEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJ0YXBcIiwgLTEsIC0xKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfMSA9IFtuZXcgQW1vbmcoXCJcIiwgLTEsIDQpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJJXCIsIDAsIDEpLCBuZXcgQW1vbmcoXCJVXCIsIDAsIDIpLCBuZXcgQW1vbmcoXCJZXCIsIDAsIDMpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYV8yID0gW1xuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcVVcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJhYmxcIiwgLTEsIDMpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJJXFx1MDBFOHJcIiwgLTEsIDQpLCBuZXcgQW1vbmcoXCJpXFx1MDBFOHJcIiwgLTEsIDQpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJldXNcIiwgLTEsIDIpLCBuZXcgQW1vbmcoXCJpdlwiLCAtMSwgMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzMgPSBbXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImljXCIsIC0xLCAyKSwgbmV3IEFtb25nKFwiYWJpbFwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIml2XCIsIC0xLCAzKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfNCA9IFtuZXcgQW1vbmcoXCJpcVVlXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXRyaWNlXCIsIC0xLCAyKSwgbmV3IEFtb25nKFwiYW5jZVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVuY2VcIiwgLTEsIDUpLCBuZXcgQW1vbmcoXCJsb2dpZVwiLCAtMSwgMyksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFibGVcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpc21lXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXVzZVwiLCAtMSwgMTEpLCBuZXcgQW1vbmcoXCJpc3RlXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXZlXCIsIC0xLCA4KSwgbmV3IEFtb25nKFwiaWZcIiwgLTEsIDgpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJ1c2lvblwiLCAtMSwgNCksIG5ldyBBbW9uZyhcImF0aW9uXCIsIC0xLCAyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwidXRpb25cIiwgLTEsIDQpLCBuZXcgQW1vbmcoXCJhdGV1clwiLCAtMSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlxVWVzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYXRyaWNlc1wiLCAtMSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFuY2VzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiZW5jZXNcIiwgLTEsIDUpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJsb2dpZXNcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJhYmxlc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzbWVzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiZXVzZXNcIiwgLTEsIDExKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXN0ZXNcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpdmVzXCIsIC0xLCA4KSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWZzXCIsIC0xLCA4KSwgbmV3IEFtb25nKFwidXNpb25zXCIsIC0xLCA0KSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXRpb25zXCIsIC0xLCAyKSwgbmV3IEFtb25nKFwidXRpb25zXCIsIC0xLCA0KSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXRldXJzXCIsIC0xLCAyKSwgbmV3IEFtb25nKFwibWVudHNcIiwgLTEsIDE1KSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZW1lbnRzXCIsIDMwLCA2KSwgbmV3IEFtb25nKFwiaXNzZW1lbnRzXCIsIDMxLCAxMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIml0XFx1MDBFOXNcIiwgLTEsIDcpLCBuZXcgQW1vbmcoXCJtZW50XCIsIC0xLCAxNSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVtZW50XCIsIDM0LCA2KSwgbmV3IEFtb25nKFwiaXNzZW1lbnRcIiwgMzUsIDEyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYW1tZW50XCIsIDM0LCAxMyksIG5ldyBBbW9uZyhcImVtbWVudFwiLCAzNCwgMTQpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhdXhcIiwgLTEsIDEwKSwgbmV3IEFtb25nKFwiZWF1eFwiLCAzOSwgOSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImV1eFwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIml0XFx1MDBFOVwiLCAtMSwgNylcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzUgPSBbXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlyYVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcImllXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXNzZVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcImlzc2FudGVcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXJhaVwiLCA0LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXJcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpcmFzXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWVzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFRW1lc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzc2VzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXNzYW50ZXNcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJcXHUwMEVFdGVzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXNcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcmFpc1wiLCAxMywgMSksIG5ldyBBbW9uZyhcImlzc2Fpc1wiLCAxMywgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlyaW9uc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcImlzc2lvbnNcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcm9uc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcImlzc29uc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzc2FudHNcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpdFwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlyYWl0XCIsIDIxLCAxKSwgbmV3IEFtb25nKFwiaXNzYWl0XCIsIDIxLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXNzYW50XCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXJhSWVudFwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzc2FJZW50XCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXJlbnRcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpc3NlbnRcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpcm9udFwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIlxcdTAwRUV0XCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaXJpZXpcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpc3NpZXpcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpcmV6XCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXNzZXpcIiwgLTEsIDEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYV82ID0gW25ldyBBbW9uZyhcImFcIiwgLTEsIDMpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmFcIiwgMCwgMiksIG5ldyBBbW9uZyhcImFzc2VcIiwgLTEsIDMpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhbnRlXCIsIC0xLCAzKSwgbmV3IEFtb25nKFwiXFx1MDBFOWVcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhaVwiLCAtMSwgMyksIG5ldyBBbW9uZyhcImVyYWlcIiwgNSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVyXCIsIC0xLCAyKSwgbmV3IEFtb25nKFwiYXNcIiwgLTEsIDMpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmFzXCIsIDgsIDIpLCBuZXcgQW1vbmcoXCJcXHUwMEUybWVzXCIsIC0xLCAzKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXNzZXNcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJhbnRlc1wiLCAtMSwgMyksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIlxcdTAwRTJ0ZXNcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJcXHUwMEU5ZXNcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhaXNcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJlcmFpc1wiLCAxNSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlvbnNcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJlcmlvbnNcIiwgMTcsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhc3Npb25zXCIsIDE3LCAzKSwgbmV3IEFtb25nKFwiZXJvbnNcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhbnRzXCIsIC0xLCAzKSwgbmV3IEFtb25nKFwiXFx1MDBFOXNcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhaXRcIiwgLTEsIDMpLCBuZXcgQW1vbmcoXCJlcmFpdFwiLCAyMywgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFudFwiLCAtMSwgMyksIG5ldyBBbW9uZyhcImFJZW50XCIsIC0xLCAzKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXJhSWVudFwiLCAyNiwgMiksIG5ldyBBbW9uZyhcIlxcdTAwRThyZW50XCIsIC0xLCAyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXNzZW50XCIsIC0xLCAzKSwgbmV3IEFtb25nKFwiZXJvbnRcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJcXHUwMEUydFwiLCAtMSwgMyksIG5ldyBBbW9uZyhcImV6XCIsIC0xLCAyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWV6XCIsIDMyLCAyKSwgbmV3IEFtb25nKFwiZXJpZXpcIiwgMzMsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhc3NpZXpcIiwgMzMsIDMpLCBuZXcgQW1vbmcoXCJlcmV6XCIsIDMyLCAyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFOVwiLCAtMSwgMilcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzcgPSBbbmV3IEFtb25nKFwiZVwiLCAtMSwgMyksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIklcXHUwMEU4cmVcIiwgMCwgMiksIG5ldyBBbW9uZyhcImlcXHUwMEU4cmVcIiwgMCwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlvblwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIkllclwiLCAtMSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImllclwiLCAtMSwgMiksIG5ldyBBbW9uZyhcIlxcdTAwRUJcIiwgLTEsIDQpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYV84ID0gW1xuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlbGxcIiwgLTEsIC0xKSwgbmV3IEFtb25nKFwiZWlsbFwiLCAtMSwgLTEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlbm5cIiwgLTEsIC0xKSwgbmV3IEFtb25nKFwib25uXCIsIC0xLCAtMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImV0dFwiLCAtMSwgLTEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZ192ID0gWzE3LCA2NSwgMTYsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG4gICAgICAgICAgICAgIDAsIDAsIDAsIDAsIDAsIDEyOCwgMTMwLCAxMDMsIDgsIDVcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBnX2tlZXBfd2l0aF9zID0gWzEsIDY1LCAyMCwgMCxcbiAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTI4XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgSV9wMiwgSV9wMSwgSV9wViwgc2JwID0gbmV3IFNub3diYWxsUHJvZ3JhbSgpO1xuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudCA9IGZ1bmN0aW9uKHdvcmQpIHtcbiAgICAgICAgICAgIHNicC5zZXRDdXJyZW50KHdvcmQpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5nZXRDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2JwLmdldEN1cnJlbnQoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFicjEoYzEsIGMyLCB2XzEpIHtcbiAgICAgICAgICAgIGlmIChzYnAuZXFfcygxLCBjMSkpIHtcbiAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIGlmIChzYnAuaW5fZ3JvdXBpbmcoZ192LCA5NywgMjUxKSkge1xuICAgICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKGMyKTtcbiAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8xO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gaGFicjIoYzEsIGMyLCB2XzEpIHtcbiAgICAgICAgICAgIGlmIChzYnAuZXFfcygxLCBjMSkpIHtcbiAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKGMyKTtcbiAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9wcmVsdWRlKCkge1xuICAgICAgICAgICAgdmFyIHZfMSwgdl8yO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgdl8xID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgaWYgKHNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTEpKSB7XG4gICAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgdl8yID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBpZiAoaGFicjEoXCJ1XCIsIFwiVVwiLCB2XzEpKVxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMjtcbiAgICAgICAgICAgICAgICBpZiAoaGFicjEoXCJpXCIsIFwiSVwiLCB2XzEpKVxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMjtcbiAgICAgICAgICAgICAgICBpZiAoaGFicjIoXCJ5XCIsIFwiWVwiLCB2XzEpKVxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgICAgc2JwLmJyYSA9IHZfMTtcbiAgICAgICAgICAgICAgaWYgKCFoYWJyMShcInlcIiwgXCJZXCIsIHZfMSkpIHtcbiAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8xO1xuICAgICAgICAgICAgICAgIGlmIChzYnAuZXFfcygxLCBcInFcIikpIHtcbiAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgaWYgKGhhYnIyKFwidVwiLCBcIlVcIiwgdl8xKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSB2XzE7XG4gICAgICAgICAgICAgICAgaWYgKHZfMSA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvcisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gaGFicjMoKSB7XG4gICAgICAgICAgICB3aGlsZSAoIXNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTEpKSB7XG4gICAgICAgICAgICAgIGlmIChzYnAuY3Vyc29yID49IHNicC5saW1pdClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgc2JwLmN1cnNvcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKCFzYnAub3V0X2dyb3VwaW5nKGdfdiwgOTcsIDI1MSkpIHtcbiAgICAgICAgICAgICAgaWYgKHNicC5jdXJzb3IgPj0gc2JwLmxpbWl0KVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICBzYnAuY3Vyc29yKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9tYXJrX3JlZ2lvbnMoKSB7XG4gICAgICAgICAgICB2YXIgdl8xID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIElfcFYgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICBJX3AxID0gSV9wVjtcbiAgICAgICAgICAgIElfcDIgPSBJX3BWO1xuICAgICAgICAgICAgaWYgKHNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTEpICYmIHNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTEpICYmXG4gICAgICAgICAgICAgIHNicC5jdXJzb3IgPCBzYnAubGltaXQpXG4gICAgICAgICAgICAgIHNicC5jdXJzb3IrKztcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8xO1xuICAgICAgICAgICAgICBpZiAoIXNicC5maW5kX2Ftb25nKGFfMCwgMykpIHtcbiAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8xO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgIGlmIChzYnAuY3Vyc29yID49IHNicC5saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gSV9wVjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBzYnAuY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoIXNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTEpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSV9wViA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8xO1xuICAgICAgICAgICAgaWYgKCFoYWJyMygpKSB7XG4gICAgICAgICAgICAgIElfcDEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoIWhhYnIzKCkpXG4gICAgICAgICAgICAgICAgSV9wMiA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9wb3N0bHVkZSgpIHtcbiAgICAgICAgICAgIHZhciBhbW9uZ192YXIsIHZfMTtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgIHZfMSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIHNicC5icmEgPSB2XzE7XG4gICAgICAgICAgICAgIGFtb25nX3ZhciA9IHNicC5maW5kX2Ftb25nKGFfMSwgNCk7XG4gICAgICAgICAgICAgIGlmICghYW1vbmdfdmFyKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgc3dpdGNoIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcInVcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcInlcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIHNicC5jdXJzb3IrKztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9SVigpIHtcbiAgICAgICAgICAgIHJldHVybiBJX3BWIDw9IHNicC5jdXJzb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9SMSgpIHtcbiAgICAgICAgICAgIHJldHVybiBJX3AxIDw9IHNicC5jdXJzb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9SMigpIHtcbiAgICAgICAgICAgIHJldHVybiBJX3AyIDw9IHNicC5jdXJzb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9zdGFuZGFyZF9zdWZmaXgoKSB7XG4gICAgICAgICAgICB2YXIgYW1vbmdfdmFyLCB2XzE7XG4gICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIGFtb25nX3ZhciA9IHNicC5maW5kX2Ftb25nX2IoYV80LCA0Myk7XG4gICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBzd2l0Y2ggKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigyLCBcImljXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlxVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImxvZ1wiKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcInVcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJlbnRcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICBpZiAoIXJfUlYoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZ19iKGFfMiwgNik7XG4gICAgICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNicC5lcV9zX2IoMiwgXCJhdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJfUjEoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJldXhcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocl9SMigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocl9SVigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgaWYgKCFyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgYW1vbmdfdmFyID0gc2JwLmZpbmRfYW1vbmdfYihhXzMsIDMpO1xuICAgICAgICAgICAgICAgICAgaWYgKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocl9SMigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKFwiYWJsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlxVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigyLCBcImF0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICBpZiAocl9SMigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzYnAuZXFfc19iKDIsIFwiaWNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlxVVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJlYXVcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgaWYgKCFyX1IxKCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKFwiYWxcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXJfUjEoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImV1eFwiKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICBpZiAoIXJfUjEoKSB8fCAhc2JwLm91dF9ncm91cGluZ19iKGdfdiwgOTcsIDI1MSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICBpZiAocl9SVigpKVxuICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImFudFwiKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgaWYgKHJfUlYoKSlcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJlbnRcIik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgIHZfMSA9IHNicC5saW1pdCAtIHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBpZiAoc2JwLmluX2dyb3VwaW5nX2IoZ192LCA5NywgMjUxKSAmJiByX1JWKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfMTtcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHJfaV92ZXJiX3N1ZmZpeCgpIHtcbiAgICAgICAgICAgIHZhciBhbW9uZ192YXIsIHZfMTtcbiAgICAgICAgICAgIGlmIChzYnAuY3Vyc29yIDwgSV9wVilcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdl8xID0gc2JwLmxpbWl0X2JhY2t3YXJkO1xuICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gSV9wVjtcbiAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgYW1vbmdfdmFyID0gc2JwLmZpbmRfYW1vbmdfYihhXzUsIDM1KTtcbiAgICAgICAgICAgIGlmICghYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgIHNicC5saW1pdF9iYWNrd2FyZCA9IHZfMTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICBpZiAoYW1vbmdfdmFyID09IDEpIHtcbiAgICAgICAgICAgICAgaWYgKCFzYnAub3V0X2dyb3VwaW5nX2IoZ192LCA5NywgMjUxKSkge1xuICAgICAgICAgICAgICAgIHNicC5saW1pdF9iYWNrd2FyZCA9IHZfMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gdl8xO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl92ZXJiX3N1ZmZpeCgpIHtcbiAgICAgICAgICAgIHZhciBhbW9uZ192YXIsIHZfMiwgdl8zO1xuICAgICAgICAgICAgaWYgKHNicC5jdXJzb3IgPCBJX3BWKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2XzIgPSBzYnAubGltaXRfYmFja3dhcmQ7XG4gICAgICAgICAgICBzYnAubGltaXRfYmFja3dhcmQgPSBJX3BWO1xuICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZ19iKGFfNiwgMzgpO1xuICAgICAgICAgICAgaWYgKCFhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gdl8yO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIHN3aXRjaCAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSkge1xuICAgICAgICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gdl8yO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgdl8zID0gc2JwLmxpbWl0IC0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigxLCBcImVcIikpIHtcbiAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNicC5saW1pdF9iYWNrd2FyZCA9IHZfMjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHJfcmVzaWR1YWxfc3VmZml4KCkge1xuICAgICAgICAgICAgdmFyIGFtb25nX3Zhciwgdl8xID0gc2JwLmxpbWl0IC0gc2JwLmN1cnNvcixcbiAgICAgICAgICAgICAgdl8yLCB2XzQsIHZfNTtcbiAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgaWYgKHNicC5lcV9zX2IoMSwgXCJzXCIpKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICB2XzIgPSBzYnAubGltaXQgLSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoc2JwLm91dF9ncm91cGluZ19iKGdfa2VlcF93aXRoX3MsIDk3LCAyMzIpKSB7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfMjtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQgLSB2XzE7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfMTtcbiAgICAgICAgICAgIGlmIChzYnAuY3Vyc29yID49IElfcFYpIHtcbiAgICAgICAgICAgICAgdl80ID0gc2JwLmxpbWl0X2JhY2t3YXJkO1xuICAgICAgICAgICAgICBzYnAubGltaXRfYmFja3dhcmQgPSBJX3BWO1xuICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgYW1vbmdfdmFyID0gc2JwLmZpbmRfYW1vbmdfYihhXzcsIDcpO1xuICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZfNSA9IHNicC5saW1pdCAtIHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYnAuZXFfc19iKDEsIFwic1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2JwLmVxX3NfYigxLCBcInRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKFwiaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzYnAuZXFfc19iKDIsIFwiZ3VcIikpXG4gICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gdl80O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHJfdW5fZG91YmxlKCkge1xuICAgICAgICAgICAgdmFyIHZfMSA9IHNicC5saW1pdCAtIHNicC5jdXJzb3I7XG4gICAgICAgICAgICBpZiAoc2JwLmZpbmRfYW1vbmdfYihhXzgsIDUpKSB7XG4gICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQgLSB2XzE7XG4gICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+IHNicC5saW1pdF9iYWNrd2FyZCkge1xuICAgICAgICAgICAgICAgIHNicC5jdXJzb3ItLTtcbiAgICAgICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX3VuX2FjY2VudCgpIHtcbiAgICAgICAgICAgIHZhciB2XzEsIHZfMiA9IDE7XG4gICAgICAgICAgICB3aGlsZSAoc2JwLm91dF9ncm91cGluZ19iKGdfdiwgOTcsIDI1MSkpXG4gICAgICAgICAgICAgIHZfMi0tO1xuICAgICAgICAgICAgaWYgKHZfMiA8PSAwKSB7XG4gICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICB2XzEgPSBzYnAubGltaXQgLSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoIXNicC5lcV9zX2IoMSwgXCJcXHUwMEU5XCIpKSB7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdCAtIHZfMTtcbiAgICAgICAgICAgICAgICBpZiAoIXNicC5lcV9zX2IoMSwgXCJcXHUwMEU4XCIpKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gaGFicjUoKSB7XG4gICAgICAgICAgICBpZiAoIXJfc3RhbmRhcmRfc3VmZml4KCkpIHtcbiAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdDtcbiAgICAgICAgICAgICAgaWYgKCFyX2lfdmVyYl9zdWZmaXgoKSkge1xuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFyX3ZlcmJfc3VmZml4KCkpIHtcbiAgICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICAgICAgICByX3Jlc2lkdWFsX3N1ZmZpeCgpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdDtcbiAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgaWYgKHNicC5lcV9zX2IoMSwgXCJZXCIpKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImlcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gc2JwLmxpbWl0O1xuICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigxLCBcIlxcdTAwRTdcIikpIHtcbiAgICAgICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImNcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdGVtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdl8xID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIHJfcHJlbHVkZSgpO1xuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgIHJfbWFya19yZWdpb25zKCk7XG4gICAgICAgICAgICBzYnAubGltaXRfYmFja3dhcmQgPSB2XzE7XG4gICAgICAgICAgICBzYnAuY3Vyc29yID0gc2JwLmxpbWl0O1xuICAgICAgICAgICAgaGFicjUoKTtcbiAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICByX3VuX2RvdWJsZSgpO1xuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdDtcbiAgICAgICAgICAgIHJfdW5fYWNjZW50KCk7XG4gICAgICAgICAgICBzYnAuY3Vyc29yID0gc2JwLmxpbWl0X2JhY2t3YXJkO1xuICAgICAgICAgICAgcl9wb3N0bHVkZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAvKiBhbmQgcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBzdGVtcyBhIHdvcmQgZm9yIHRoZSBjdXJyZW50IGxvY2FsZSAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIC8vIGZvciBsdW5yIHZlcnNpb24gMlxuICAgICAgICBpZiAodHlwZW9mIHRva2VuLnVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VuLnVwZGF0ZShmdW5jdGlvbih3b3JkKSB7XG4gICAgICAgICAgICBzdC5zZXRDdXJyZW50KHdvcmQpO1xuICAgICAgICAgICAgc3Quc3RlbSgpO1xuICAgICAgICAgICAgcmV0dXJuIHN0LmdldEN1cnJlbnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgeyAvLyBmb3IgbHVuciB2ZXJzaW9uIDw9IDFcbiAgICAgICAgICBzdC5zZXRDdXJyZW50KHRva2VuKTtcbiAgICAgICAgICBzdC5zdGVtKCk7XG4gICAgICAgICAgcmV0dXJuIHN0LmdldEN1cnJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5mci5zdGVtbWVyLCAnc3RlbW1lci1mcicpO1xuXG4gICAgbHVuci5mci5zdG9wV29yZEZpbHRlciA9IGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlcignYWkgYWllIGFpZW50IGFpZXMgYWl0IGFzIGF1IGF1cmEgYXVyYWkgYXVyYWllbnQgYXVyYWlzIGF1cmFpdCBhdXJhcyBhdXJleiBhdXJpZXogYXVyaW9ucyBhdXJvbnMgYXVyb250IGF1eCBhdmFpZW50IGF2YWlzIGF2YWl0IGF2ZWMgYXZleiBhdmlleiBhdmlvbnMgYXZvbnMgYXlhbnQgYXlleiBheW9ucyBjIGNlIGNlY2kgY2Vsw6AgY2VzIGNldCBjZXR0ZSBkIGRhbnMgZGUgZGVzIGR1IGVsbGUgZW4gZXMgZXN0IGV0IGV1IGV1ZSBldWVzIGV1cmVudCBldXMgZXVzc2UgZXVzc2VudCBldXNzZXMgZXVzc2lleiBldXNzaW9ucyBldXQgZXV4IGXDu21lcyBlw7t0IGXDu3RlcyBmdXJlbnQgZnVzIGZ1c3NlIGZ1c3NlbnQgZnVzc2VzIGZ1c3NpZXogZnVzc2lvbnMgZnV0IGbDu21lcyBmw7t0IGbDu3RlcyBpY2kgaWwgaWxzIGogamUgbCBsYSBsZSBsZXMgbGV1ciBsZXVycyBsdWkgbSBtYSBtYWlzIG1lIG1lcyBtb2kgbW9uIG3Dqm1lIG4gbmUgbm9zIG5vdHJlIG5vdXMgb24gb250IG91IHBhciBwYXMgcG91ciBxdSBxdWUgcXVlbCBxdWVsbGUgcXVlbGxlcyBxdWVscyBxdWkgcyBzYSBzYW5zIHNlIHNlcmEgc2VyYWkgc2VyYWllbnQgc2VyYWlzIHNlcmFpdCBzZXJhcyBzZXJleiBzZXJpZXogc2VyaW9ucyBzZXJvbnMgc2Vyb250IHNlcyBzb2kgc29pZW50IHNvaXMgc29pdCBzb21tZXMgc29uIHNvbnQgc295ZXogc295b25zIHN1aXMgc3VyIHQgdGEgdGUgdGVzIHRvaSB0b24gdHUgdW4gdW5lIHZvcyB2b3RyZSB2b3VzIHkgw6Agw6l0YWllbnQgw6l0YWlzIMOpdGFpdCDDqXRhbnQgw6l0aWV6IMOpdGlvbnMgw6l0w6kgw6l0w6llIMOpdMOpZXMgw6l0w6lzIMOqdGVzJy5zcGxpdCgnICcpKTtcblxuICAgIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLmZyLnN0b3BXb3JkRmlsdGVyLCAnc3RvcFdvcmRGaWx0ZXItZnInKTtcbiAgfTtcbn0pKSIsImxldCByaCA9IGdsb2JhbC5yaFxyXG5sZXQgbHVucmxhbmcgPSByZXF1aXJlKCcuLi8uLi9ub2RlX21vZHVsZXMvbHVuci1sYW5ndWFnZXMvbHVuci5mcicpXHJcbnJoLl8uZXhwb3J0cyggbHVucmxhbmcpIl19
