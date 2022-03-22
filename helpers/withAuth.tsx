import React from "react";
import router from "next/router";
import { auth } from "../lib/firebase";

type MyProps = {};
type MyState = { status: string };

const withAuth = (Component: any) => {
  return class extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
      super(props);
      this.state = { status: "LOADING" };
    }
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        console.log(authUser);
        if (authUser) {
          this.setState({ status: "SIGNED_IN" });
        } else {
          router.push("/login");
        }
      });
    }

    renderContent() {
      const { status } = this.state;
      if (status === "LOADING") {
        return null;
      } else if (status === "SIGNED_IN") {
        return <Component {...this.props} />;
      }
    }

    render() {
      return <React.Fragment>{this.renderContent()} </React.Fragment>;
    }
  };
};
export default withAuth;
