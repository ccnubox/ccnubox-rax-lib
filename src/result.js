// demo
import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import ListView from 'rax-listview';

let icon = {
  uri:"http://ocm66x3nz.bkt.clouddn.com/ios_ccnubox/book_icon.png"
}
let listData = [
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
    {name1: 'tom'}, {name1: 'tom'}, {name1: 'tom'},
];
// 将 item 定义成组件

class ListViewDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: listData
    };
  }
  listHeader = () => {
    return (
      <View style={styles.title}>
        <Text style={styles.text}>列表头部</Text>
      </View>
    );
  }
  listLoading = () => {
    if (this.state.index < 4) {
      return (
        <View style={styles.loading}>
          <Text style={styles.text}>加载中...</Text>
        </View>
      );
    } else {
      return null;
    }
  }
  listItem = (item, index) => {
    
      return (
        <View style={styles.book_content_containner}>
          <Image source = {icon} style = {styles.book_icon}/>
          <Text style={styles.title}>{styles.book_title}</Text>
          <Text style={styles.author}>{styles.book_author} 著</Text>
          <Text style={styles.text}>{styles.book_press}</Text>
        </View>
      );
   
  }
  handleLoadMore = () => {
    setTimeout(() => {
      this.state.index++;
      if (this.state.index < 5) {
        this.state.data.push(
          {name1: 'loadmore 2'},
          {name1: 'loadmore 3'},
          {name1: 'loadmore 4'},
          {name1: 'loadmore 5'},
          {name1: 'loadmore 2'},
          {name1: 'loadmore 3'},
          {name1: 'loadmore 4'},
          {name1: 'loadmore 5'}
        );
      }
      this.setState(this.state);
    }, 1000);
  }

  render() {
    return (
      <View style={styles.App}>
      <View style = {styles.awayTop}></View>
      <ListView
       
        renderHeader={this.listHeader}
        renderFooter={this.listLoading}
        renderRow={this.listItem}
        dataSource={this.state.data}
        onEndReached={this.handleLoadMore}
      />
      </View>
    );
  }

};

const styles = {
    App:{
      backgroundColor:"rgb(239,239,244)",
      width:750,
      height:1334,
      alignItems: 'center'
    
  },
  awayTop:{
    width:750,
    height:18,
    backgroundColor:"rgb(239,239,244)",
  },
  book_content_containner:{
    backgroundColor:"rgb(255,255,255)",
    paddingTop:41,
    paddingButtom:41,
    paddingLeft:45,
    marginTop:20,
    height:161,
    width:750
  },
  
  book_icon:{
    position:"relative",
    top:15,
    width:60,
    height:44
  },
  book_title:{
    fontSize:30,
    marginLeft:40,
    fontWeight:800
  },
  book_author:{
    float:"left",
    fontSize:26,
    fontWeight:400,
    width:264,
    textOverflow:"ellipsis"
  },
  book_press:{
    fontSize:26,
    fontWeight:400,
    marginLeft:18,
    textOverflow:"ellipsis"
  },
  text: {
    fontSize: 28,
    color: '#000000',
    fontSize: 28,
    padding: 40
  },
  item1: {
    height: 110,
    backgroundColor: '#909090',
    marginBottom: 3
  },
  item2: {
    height: 110,
    backgroundColor: '#e0e0e0',
    marginBottom: 3
  },
  loading: {
    padding: 50,
    textAlign: 'center',
  }
};
export default ListViewDemo