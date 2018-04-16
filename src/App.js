import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Button from "rax-button";
import Image from "rax-image";
import TextInput from "rax-textinput";
import Link from "rax-link";

const stylechange = 0.56;

let image = {
  uri: "http://ocm66x3nz.bkt.clouddn.com/ios_ccnubox/search_picture.png"
};
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
  render() {
    return (
      <View style={styles.App}>
        <Image
          style={styles.searchCenterPicture}
          source={image}
          resizeMode="contain"
        />
        <TextInput
          multiline={true}
          style={styles.searchInput}
          onChange={event => this.updateText(event.nativeEvent.text)}
          onInput={event => this.updateText(event.nativeEvent.text)}
          placeholder="输入关键字查找书籍"
        />
        <Link
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
          <View style={styles.searchButtonContainner}>
            <Text style={styles.searchButtonText}>搜索</Text>
          </View>
        </Link>
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "rgb(239,239,244)",
    width: 750,
    height: 1334,
    alignItems: "center"
  },
  searchInput: {
    position: "absolute",
    top: 462,
    left: 100,
    width: 540,
    height: 100,
    backgroundColor: "rgb(255,255,255)",
    fontSize: 34,
    padding: 20
  },
  searchCenterPicture: {
    position: "absolute",
    top: 100,
    left: 200,
    width: 350,
    height: 240
  },
  searchButton: {
    position: "absolute",
    top: 614,
    left: 100,
    width: 350,
    height: 240,
    backgroundColor: "rgb(103,103,250)",
    borderRadius: "5%",
    height: 100,
    width: 552
  },
  searchButtonContainner: {
    height: 100,
    width: 552,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  searchButtonText: {
    color: "rgb(255,255,255)",
    fontSize: 36
  }
};
export default App;
