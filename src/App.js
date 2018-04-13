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
  _handleParams() {
    // window.location =
    //   "http://10.146.101.20:9999/js/second.bundle.js?_wx_tpl=http://10.146.101.20:9999/js/second.bundle.js" +
    //   "/?keywords=" +
    //   this.state.text +
    //   "&page=" +
    //   this.state.page;
  }
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
          onChangeText={text => {
            this.setState({ text });
          }}
          placeholder="输入关键字查找书籍"
        />
        <Link
          href={
            "./second.bundle.js/?keywords=" +
            this.state.text +
            "&page=" +
            this.state.page
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

//  class TextAreaDemo extends Component {
//   state = {
//     text: 'Hello #World , Hello #Rax , Hello #天天好心情'
//   };

//   render() {
//     let delimiter = /\s+/;

//     // split string
//     let _text = this.state.text;
//     let token, index, parts = [];
//     while (_text) {
//       delimiter.lastIndex = 0;
//       token = delimiter.exec(_text);
//       if (token === null) {
//         break;
//       }
//       index = token.index;
//       if (token[0].length === 0) {
//         index = 1;
//       }
//       parts.push(_text.substr(0, index));
//       parts.push(token[0]);
//       index = index + token[0].length;
//       _text = _text.slice(index);
//     }
//     parts.push(_text);

//     let hashtags = [];
//     parts.forEach((text) => {
//       if (/^#/.test(text)) {
//         hashtags.push(<Text key={text} style={styles.hashtag}>{text}</Text>);
//       }
//     });

//     return (
//       <View style={styles.container}>
//         <TextInput
//           multiline={true}
//           style={styles.multiline}
//           value={this.state.text}
//           onChangeText={(text) => {
//             this.setState({text});
//           }} />
//         <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
//           {hashtags}
//         </View>
//       </View>
//     );
//   }
// }
