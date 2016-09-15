/* global sap, $ */

// Provides control com.sap.mentors.lemonaid.controls.MentorShirt
sap.ui.define([], function () {
	"use strict";

	/**
	 * Constructor for a new MentorShirt control.
	 *
	 * @class
	 * Displays SAP Mentor shirt.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP Mentors
	 * @version 0.1
	 *
	 * @constructor
	 */
	return sap.ui.core.Control.extend("com.sap.mentors.lemonaid.controls.MentorShirt", {

		metadata: {
			library: "com.sap.mentors.lemonaid.controls",
			properties: {
				/**
				 * Type of shirt. Possible values are (M)ale or (F)emale
				 */
				gender : { type: "string", defaultValue: "" },
				/**
				 * Text shown on top of Mentor shirt
				 */
				text   : { type: "string", defaultValue: "" },
				/**
				 * Large number shown on Mentor shirt
				 */
				number : { type: "string", defaultValue: 0 }
			}
		},

		/**
		 * Initializes the control
		 */
		init: function () {
		},

		/**
		 * Initializes the HTML of the control
		 * NOTE: This is a static function, so use  "oControl" instance instead of "this" in the renderer function
		 *
		 * @param oRm      {RenderManager} reference to the core control's render manager
		 * @param oControl {MentorShirt}   reference to the control itself
		 */
		renderer: function (oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.addClass("mentorShirtContainer");
			oRm.writeClasses();

			oRm.write(">");

			oRm.write("<div class=\"mentorShirtContainer\">");
			oRm.write("<div class=\"mentorShirtText mentorShirtTypeface\"></div>");
			oRm.write("<div class=\"mentorShirtNumber mentorShirtTypeface\">" + oControl.getNumber() + "</div>");
			oRm.write("<span class=\"hidden-resizer mentorShirtText mentorShirtTypeface\" style=\"visibility: hidden\">" + oControl.getText() + "</span>");
			oRm.write("</div>");

			oRm.write("</div>");
		},

		/**
		 *
		 */
		onAfterRendering: function () {
			this._resizeMentorShirtText();
		},

		/**
		 * Overrides the standard 'setGender' method. It also sets the correct CSS class
		 * for displaying the correct shirt image based on sGender
		 *
		 * @param sGender {string} Type of shirt. Possible values are (M)ale or (F)emale
		 */
		setGender: function(sGender) {
			var container = $(".mentorShirtContainer");
			if (sGender === "F") {
				container.removeClass("male").addClass("female");
			}
			else {
				container.removeClass("female").addClass("male");
			}
			this.setProperty("gender", sGender);
		},

		/**
		 * Resizes the entered 'text' to fit the width of the shirt correctly,
		 *
		 * @private
		 */
		_resizeMentorShirtText: function() {
			var size;
			var desiredWidth = 135; // arbitrarily determined maximum pixel width for shirt text
			var resizer = $(".hidden-resizer.mentorShirtText");

			this.setGender(this.getGender());

			while(resizer.width() > desiredWidth) {
				size = parseInt(resizer.css("font-size"), 10);
				resizer.css("font-size", size - 1);
			}

			$("div.mentorShirtText").css("font-size", size).html(resizer.html());
		}
	});

}, true);
