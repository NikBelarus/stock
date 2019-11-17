import React from "react";
import {FieldTitle} from "../basecomponents/content/FieldTitle";
import {connect} from "react-redux";

const Home = () => {
  return (
      <article>
        <FieldTitle text="Welcome"/>
        <p>Thanks for using our app</p>
      </article>
  )
};

export default connect()(Home);
