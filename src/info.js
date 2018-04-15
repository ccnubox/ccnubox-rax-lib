// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import BookService from "../services/Books";

// 将 item 定义成组件

class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 138,
      info: {}
    };
  }
  componentWillMount() {
    this._getInfo();
  }
  // 路由拉取单个书籍信息
  _getInfo() {
    let option = {};
    option.id = this.state.id;
    BookService.getSingeBookInfo(option).then(
      res => {
        alert(res);
        let info = res;

        //this.setState({ info });
      },
      err => {
        // for(let item in err)
        alert("item：" + err.statusText);
        throw err;
      }
    );
  }

  render() {
    return (
      <View style={styles.App}>
        {/* <View style={styles.detailContainner}>
          <View style={styles.title} />
          <View style={styles.publisher} />
          <View style={styles.content} />
        </View>
        <View style={styles.statusTab}>
          <table>
            <tr>
              <th>索书号</th>
              <th>馆藏地址</th>
              <th>书刊状态</th>
            </tr>
            {this.state.info.books.foreach((book, index) => {
              return (
                <tr>
                  <td>{book.tid}</td>
                  <td>{book.room}</td>
                  <td>
                    {book.status}-应还日期{book.status === "借出"
                      ? <br /> + book.date
                      : null}
                  </td>
                </tr>
              );
            })}
          </table>
        </View> */}
      </View>
    );
  }
}

const styles = {
  App: {
    backgroundColor: "black",
    // backgroundColor: "rgb(239,239,244)",
    width: 750,
    height: 1334,
    alignItems: "center"
  },
  awayTop: {
    width: 750,
    height: 18,
    backgroundColor: "rgb(239,239,244)"
  },
  book_content_containner: {
    backgroundColor: "rgb(255,255,255)",
    paddingTop: 41,
    paddingButtom: 41,
    paddingLeft: 45,
    marginTop: 20,
    height: 161,
    width: 750
  },

  book_icon: {
    position: "relative",
    top: 15,
    width: 60,
    height: 44
  },
  book_title: {
    fontSize: 30,
    marginLeft: 102,
    marginTop: -44,
    fontWeight: 800
  },
  book_author: {
    fontSize: 26,
    color: "rgb(174,174,178)",
    width: 500,
    whiteSpace: "noWrap",
    height: 30,
    marginTop: 15,
    marginLeft: 115,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  text: {
    fontSize: 28,
    color: "#000000",
    fontSize: 28,
    padding: 40
  },
  item1: {
    height: 110,
    backgroundColor: "#909090",
    marginBottom: 3
  },
  item2: {
    height: 110,
    backgroundColor: "#e0e0e0",
    marginBottom: 3
  },
  loading: {
    padding: 50,
    textAlign: "center"
  }
};
export default ListViewDemo;
