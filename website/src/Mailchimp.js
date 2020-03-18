import React, { Component } from "react";
import "./Mailchimp.css";
import Config from "./config.json";

class Mailchimp extends Component {
  render() {
    return (
      <div className="signup-wrapper">
        <div id="mc_embed_signup">
          <form
            action="https://newnoetic.us4.list-manage.com/subscribe/post?u=f9cbaa4106322fe0aa08d292a&amp;id=249676a640"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <h1>Sign up for the private beta</h1>
              <br />
              <div className="mc-field-group">
                <label for="mce-EMAIL">
                  What's your email? <span class="asterisk">*</span>
                </label>
                <input
                  type="email"
                  value=""
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                />
              </div>
              <div className="mc-field-group">
                <label for="mce-REASON">
                  Why are you interested in {Config.name}?{" "}
                  <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  value=""
                  name="REASON"
                  className="required"
                  id="mce-REASON"
                />
              </div>
              <div id="mce-responses" class="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                />
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                />
              </div>
              <div
                style={{ position: "absolute", left: -5000 + "px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_f9cbaa4106322fe0aa08d292a_249676a640"
                  tabindex="-1"
                  value=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Sign up"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Mailchimp;
