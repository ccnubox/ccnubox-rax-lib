import { createElement, Component, render } from "rax";
import View from "rax-view";
import Image from "rax-image";
import searchPicture from "./assets/search_picture.png";
import BoxButton from "./box-ui/common/button";
import BoxInput from "./box-ui/common/text-input";
const native = require("@weex-module/test");

const stylechange = 0.56;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      page: 1
    };
  }
  updateText = text => {
    this.setState({ text });
  };
  nav = () => {
    if (this.state.text === "") {
      alert("请输入关键词！");
    } else {
      native.push(`ccnubox://lib.search.result?keyword=${this.state.text}`);
    }
  };
  render() {
    return (
      <View style={styles.App}>
        <Image
          style={styles.searchCenterPicture}
          source={searchPicture}
          resizeMode="contain"
        />
        <BoxInput
          style={styles.searchInput}
          onChange={event => this.updateText(event.nativeEvent.text)}
          onInput={event => this.updateText(event.nativeEvent.text)}
          placeholder="输入关键字查找书籍"
        />
        <BoxButton
          onPress={this.nav}
          style={styles.searchButtonContainner}
          textStyle={styles.searchButtonText}
          text="搜索"
        />
        {/* <Link
          href={
            this.state.text !== ""
              ? encodeURI(
                  "./second.bundle.js/?keywords=" +
                    this.state.text +
                    "&page=" +
                    this.state.page
                )
              : null
          }
          style={styles.searchButton}
        >
          
        </Link> */}
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "rgb(239,239,244)",
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: 100
  },
  searchInput: {
    width: 552,
    height: 100,
    fontSize: 34,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 50
  },
  searchCenterPicture: {
    width: 350,
    height: 240,
    marginBottom: 120
  },
  searchButton: {
    height: 100,
    width: 552
  },
  searchButtonContainner: {
    height: 100,
    width: 552
  },
  searchButtonText: {
    fontSize: 36
  }
};
export default App;
