// demo
import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import Image from "rax-image";
import BookService from "../services/Books";
let icon = {
  uri: "http://ocm66x3nz.bkt.clouddn.com/ios_ccnubox/book_icon.png"
};

// 将 item 定义成组件

class ListViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          book: "1.朝花夕拾",
          author: "从维熙著",
          publisher: "高等教育出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0001315032",
          id: "0001315032"
        },
        {
          book: "2.鲁迅全集.第二卷.重排第1版",
          author: "鲁迅著",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0001424533",
          id: "0001424533"
        },
        {
          book: "3.朝花夕拾:《江汉大学报》优秀作品集锦",
          author: "雷惠萍主编",
          publisher: "武汉出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0001296157",
          id: "0001296157"
        },
        {
          book: "4.朝花夕拾",
          author: "鲁迅著",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000053281",
          id: "0000053281"
        },
        {
          book: "5.鲁迅全集",
          author: "鲁迅",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0001043861",
          id: "0001043861"
        },
        {
          book: "6.鲁迅著作初版精选集",
          author: "杨阳",
          publisher: "中央编译出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0001011850",
          id: "0001011850"
        },
        {
          book: "7.朝花夕拾:一九二六一二七年著.第2版",
          author: "鲁迅著 鲁迅全集出版社",
          publisher: "民国36",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000486974",
          id: "0000486974"
        },
        {
          book: "8.朝花夕拾",
          author: "亦舒著",
          publisher: "新世界出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000642492",
          id: "0000642492"
        },
        {
          book: "9.鲁迅全集",
          author: "鲁迅",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000448119",
          id: "0000448119"
        },
        {
          book: "10.朝花夕拾",
          author: "鲁迅 [著]",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000484688",
          id: "0000484688"
        },
        {
          book: "11.朝花夕拾十篇",
          author: "鲁迅著",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000475534",
          id: "0000475534"
        },
        {
          book: "12.鲁迅全集.重排第1版",
          author: "鲁迅",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000450895",
          id: "0000450895"
        },
        {
          book: "13.鲁迅全集.二,彷徨,野草,朝花夕拾,故事新编",
          author: "鲁迅,",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000450840",
          id: "0000450840"
        },
        {
          book: "14.朝花夕拾",
          author: "鲁迅 [著]",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000450761",
          id: "0000450761"
        },
        {
          book: "15.朝花夕拾:插图本",
          author: "鲁迅",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000375311",
          id: "0000375311"
        },
        {
          book: "16.呐喊 彷徨 朝花夕拾",
          author: "鲁迅,",
          publisher: "内蒙古人民出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000298404",
          id: "0000298404"
        },
        {
          book: "17.青葱可爱的水横枝:《朝花夕拾》心读",
          author: "王景山编著",
          publisher: "首都师范大学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000297648",
          id: "0000297648"
        },
        {
          book: "18.Dawn blossoms plucked at dusk /",
          author: "Lu, Hs鮱n Foreign Languages",
          publisher: "Press,",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000115305",
          id: "0000115305"
        },
        {
          book: "19.鲁迅全集.第二卷,彷徨 野草 朝花夕拾 故事新编",
          author: "鲁迅",
          publisher: "人民文学出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000048998",
          id: "0000048998"
        },
        {
          book: "20.《朝花夕拾》浅析",
          author: "绍兴鲁迅纪念馆,厦门大学中文系编著",
          publisher: "福建人民出版社",
          bid: "fff",
          bookurl: "http://202.114.34.15/opac/item.php?marc_no=0000040864",
          id: "0000040864"
        }
      ],

      keywords: "朝花夕拾",
      page: 1
    };
  }
  componentWillMount() {
    //  this._urlDeal();
    // this._getBook();
  }
  //处理url，分解出参数
  // _urlDeal() {
  //   let param = window.location.href.split("&");
  //   let keywords = param[0].split("keywords=")[1];
  //   let page = param[1].split("page=")[1];
  //   this.setState({
  //     keywords,
  //     page
  //   });
  // }
  // 路由拉取书籍数据
  _getBook() {
    let option = {};
    option.page = this.state.page;
    option.keywords = this.state.keywords;
    BookService.getBook(option).then(
      res => {
        let data = res.result;
        //error!
        //this.setState({ data });
        alert(data);
      },
      err => {
        console.log(err);
        throw err;
      }
    );
  }
  listLoading = () => {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  };
  listItem = (item, index) => {
    return (
      <View style={styles.book_content_containner}>
        <Image source={icon} style={styles.book_icon} />
        <Text style={styles.book_title}>{item.book}</Text>
        <Text style={styles.book_author}>
          {item.author} 著
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.publisher}
        </Text>
      </View>
    );
  };
  handleLoadMore = () => {
    setTimeout(() => {
      let page = this.state.page++;
      this.setState({ page });
      this._getBook();
    }, 1000);
  };

  render() {
    return (
      <View style={styles.App}>
        <View style={styles.awayTop} />
        <ListView
          renderFooter={this.listLoading}
          renderRow={this.listItem}
          dataSource={this.state.data}
          onEndReached={this.handleLoadMore}
        />
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
