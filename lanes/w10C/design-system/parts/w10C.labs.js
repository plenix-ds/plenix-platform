/* Plenix design system · w10C: composition spacing labs; child controls keep their own labs. */
if (window.DS && DS.registerLab) {
  (function () {
    var data = [{"name":"Wizard","id":"wizard","sec":"patterns","sub":"Creation and editing","leaf":"Wizard","icon":"checklist","variants":[["page","Page"],["summary","With summary step"],["linear","Linear"],["free","Free navigation"]]},{"name":"WizardDialog","id":"wizard-dialog","sec":"overlays","sub":"Dialogs","leaf":"Wizard dialog","icon":"checklist","variants":[["md","Medium"],["lg","Large"],["full","Full screen"]]},{"name":"FormFlow","id":"form-flow","sec":"patterns","sub":"Creation and editing","leaf":"Create flow","icon":"pencil","variants":[["dialog","Create in a dialog"],["page","Create on a page"],["inline","Edit in place"],["drawer","Edit in a drawer"]]},{"name":"Autosave","id":"autosave","sec":"patterns","sub":"Creation and editing","leaf":"Autosave","icon":"refresh","variants":[["saving","Saving"],["saved","Saved"],["offline","Offline"],["failed","Failed"]]},{"name":"DraftState","id":"draft-state","sec":"patterns","sub":"Creation and editing","leaf":"Draft state","icon":"pencil","variants":[["badge","Draft badge"],["discard","Discard draft"],["resume","Resume draft"]]},{"name":"SaveAs","id":"save-as","sec":"patterns","sub":"Creation and editing","leaf":"Save as","icon":"document","variants":[["location","Name and location"],["format","With format"]]},{"name":"ArchiveRestore","id":"archive-restore","sec":"patterns","sub":"Review and approval","leaf":"Archive","icon":"archive","variants":[["archive","Archive"],["banner","Archived banner"],["restore","Restore"]]}];
    var esc = function (v) { return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };
    var button = function (label) { return '<button type="button" class="plx-button plx-button--secondary plx-button--size-md">' + label + "</button>"; };
    var badge = function (label, icon, tone) { return '<span class="plx-badge plx-badge--' + tone + '"><span class="plx-icon plx-icon--' + icon + '" aria-hidden="true"></span>' + label + "</span>"; };
    data.forEach(function (d) {
      DS.registerLab(d.id, { name: d.leaf, title: "Plenix " + d.leaf.toLowerCase(), file: "platform/patterns/" + d.name + "/" + d.id + ".css", compPrefix: new RegExp("^plx-comp-" + d.id + "-"), store: "plenix-" + d.id + "-lab-tokens",
        sizes: [["default", "Default", ".plx-" + d.id]], variants: d.variants, states: [["default", "Default"]], content: [["record", "Record"]], labels: {size: "Size", variant: "Variant", state: "State", content: "Content"}, defaults: {size: "default", variant: d.variants[0][0], state: "default", content: "record"},
        props: [{id: "gap", label: "Space between regions", css: ["row-gap"], cat: "space"}],
        token: function (id) { return id === "gap" ? "plx-comp-" + d.id + "-gap" : null; },
        every: "every " + d.leaf.toLowerCase(),
        html: function (variant, size, state, extraCls) {
          var cls = "plx-" + d.id + " plx-stack" + (extraCls ? " " + extraCls : ""), body;
          if (d.id === "autosave") { var s = {saving: ["Saving", "refresh", "active"], saved: ["Saved", "check", "success"], offline: ["Offline", "cloud-off", "waiting"], failed: ["Save failed", "alert", "negative"]}[variant]; body = badge(s[0], s[1], s[2]) + (variant === "failed" ? button("Retry") : ""); }
          else if (d.id === "draft-state") body = badge("Draft", "pencil", "neutral") + (variant === "badge" ? "" : button(variant === "discard" ? "Discard draft" : "Resume draft"));
          else if (d.id === "archive-restore") body = variant === "archive" ? button("Archive") : '<div class="plx-banner plx-banner--neutral">' + badge("Archived", "archive", "neutral") + "Restore this record to make it active again." + (variant === "restore" ? button("Restore") : "") + "</div>";
          else { body = '<label class="plx-field__label">Name<input aria-label="Name" class="plx-input" value="Record"></label>'; if (d.id === "save-as") body += button("Library") + (variant === "format" ? '<select aria-label="Format" class="plx-input"><option>PDF</option></select>' : ""); else body = '<span class="plx-text plx-text--heading">Details</span>' + body; body += button(d.id === "save-as" ? "Save copy" : "Next"); }
          return '<div class="' + cls + '">' + body + "</div>";
        }, labelSelector: ".plx-button", parts: {gap: "A"}, anchors: {A: {part: null, side: "left"}}, sections: [["Composition", ["gap"]]], matrixLabel: "Workflow variants", statesHead: "Composition spacing"
      });
    });
  })();
}
