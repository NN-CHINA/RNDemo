/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {title} from 'errorhandler';
import React,{Component} from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,//文本框
  ScrollView,//滚动视图
  FlatList,//长列表
  SectionList,//分组列表
  ActivityIndicator,//圆形加载指示器
  AppRegistry,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation'

//全局变量
var movieUrl = 'https://facebook.github.io/react-native/movies.json'
var globalNavigate
/*
{
  "title": "The Basics - Networking",
  "description": "Your app fetched this from a remote endpoint!",
  "movies": [
    { "title": "Star Wars", "releaseYear": "1977"},
    { "title": "Back to the Future", "releaseYear": "1985"},
    { "title": "The Matrix", "releaseYear": "1999"},
    { "title": "Inception", "releaseYear": "2010"},
    { "title": "Interstellar", "releaseYear": "2014"}
  ]
}
*/

/*
View
最基本的UI组件，支持 flexbox, style, some touch handling和容易控制的布局容器
View对应原生视图，在任何运行react-native的平台相同。
View可以嵌套，可以有多种类型
*/

/*
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?^%$
 *Flexbox
 *指定组件子元素的布局
 *flexDirection
 *布局的主轴，竖直轴(column)，水平轴（row）,列从下（column-reverse），行从右（row-reverse);
 *flex-wrap
 *换行，不换行（nowrap），正方向换行（warp),反方向换行（warp-reverse）；
 *justifyContent
 *子元素沿主轴的排列方式，可选项为flex-start、center、flex-end、space-around以及space-between
 *alignItems
 *决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式
 *可选参数为flex-start、center、flex-end以及stretch
 *flax
 *收缩，1沿主轴方向拉伸屏幕长度
 */



 export default class App extends Component {
   render() {
      return <Test/>
   }

}

class ViewColoredBoxesWithText extends Component {
  render() {
    return (

      <View style={styles.container}>
          <View style={{
            backgroundColor:'blue',
            flex:0.3//沿主轴方向的长度比例
          }}/>
          <View/>
          <View style={{
            backgroundColor:'red',
            flex:0.5
          }}/>
          <Text style={{
            flex:0.45,
            textAlign:'center'
          }}>Good Good Study! Day Day Up!</Text>
          <Text></Text>
          <View style={{
            backgroundColor:'green',
            flex:0.5
          }}/>
      </View>

    )
  }
}

class CustomerCell extends Component {
  render(){
    return (
      <View>
      <View style={styles.item}>
        <Image style={{width: 46, height: 46}} source={require('./source/default_avatar.png')}/>

        <View style={
          {
            margin: 10,
           justifyContent:'space-between'
            }
        }>
          <Text>{this.props.name}</Text>
          <Text style={{
            marginTop:5,
            fontSize:15,
            color:'red',
          }}>{this.props.age}</Text>
        </View>
      </View>
        <View style={{backgroundColor : '#DDD', height: 1}}/>
      </View>
    );
  }
}

class NormalCell extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.normalCell} onPress={
        () => globalNavigate('ActivityIndicator_', {name : 'ActivityIndicatorVC'})
      }>
      <View>
        <View style={styles.normalCell}>
          <Text>{this.props.title}</Text>
        </View>
        <View style={{backgroundColor : '#DDD', height: 0.7}}/>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    indicatorContainer: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFF',
    },
    indicatorWarpContainer:{
      backgroundColor:'rgba(0,0,0,0.4)',
      width:90,
      height:90,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:10,
    },
    container: {
      margin:10,//距平级周围视图边距
      padding:10,//距子视图边距
      height:100,
      flexDirection:'row',
      borderColor:'gray',
      borderRadius:4,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#FEFEFE',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: 'purple',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    tableViewContainer: {
      paddingTop:20,
      backgroundColor: '#F0F0F0',
      flex:1,
    },
    item: {
      height:66,
      backgroundColor:'#FFF',
      flexDirection: 'row',
      justifyContent:'flex-start',
      alignItems:'center',
      padding: 10,
    },
    normalCell: {
      backgroundColor:'white',
      height:44,
      padding:10,
      flexDirection:'row',
      alignItems:'center',
    }
})

class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'Components',
  }

  //构造器
  constructor(props){
    super(props)
    this.state={
      load:false
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    globalNavigate = navigate
    if (this.state.load==false) {
      return <Loading/>
    }
    return(
      <ScrollView style={styles.tableViewContainer}>
       <View>
          <Text>{this.title}</Text>
       </View>
       <FlatList
           data={this.state.dataSource}
           renderItem={({item}) => <CustomerCell name={item.key} age={item.age}/>}
       />
       <ViewColoredBoxesWithText/>
       <Button title="Next"
           onPress={() => navigate('First', {name : 'A'})}
           />
       </ScrollView>
    )
  }

  //执行耗时操作
  componentDidMount() {
    this.getData();
  }
  //取消任何未完成的请求
  componentWillUnmount() {

  }
  //网络请求
  getData() {
    fetch(movieUrl)
    .then((response) => {
     return response.json()
    })
    .then((responseJson) => {
      this.setState({
        load:true
      })
      return responseJson.movies
    })
    .catch((error) => {
      console.warn(error)
    })
    .done()
  }
}

/**
ActivityIndicator
props
animating:Whether to show the indicator (true, the default) or hide it (false).
color:The foreground color of the spinner (default is gray).
size:Size of the indicator (default is 'small'). Passing a number to the size prop is only supported on Android.
hidesWhenStopped:Whether the indicator should hide when not animating (true by default).
*/
class Loading extends React.Component {
  render(){
    return(
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color='#F00' animating={true} size={0}/>
      </View>
    )
  }
}

const Test = StackNavigator({
    Home: {screen: HomeScreen},
})



// class FlexDirectionBasics extends Component {
//   render() {
//     return (
//       <View style={{
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'stretch',
//         width:250,
//         height:250,
//         top: 0,
//         backgroundColor:'#ddd'
//       }}>
//         <View style={{width: 50, height: 50, backgroundColor:'#f00'}}/>
//         <View style={{width: 50, /*height: 50,*/ backgroundColor:'#00f'}}/>
//         <View style={{width: 50, height: 50, backgroundColor:'#0f0'}}/>
//       </View>
//     );
//   }
// };
/*
AppRegistry.registerComponent('Test', () => FlexDirectionBasics);

export default class NN extends Component {
  render() {
    let pic = {
          uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
    return (
        <ScrollView>

          <View style={{
            backgroundColor:'#0f0'
          }}>
            <Image source={pic} style={{width: 320, height:180}}/>
          </View>

          <Image source={require('./img/test1.png')} />

          <FlexDirectionBasics>
          </FlexDirectionBasics>
        </ScrollView>

      </View>

      <View>
      <View style={
        styles.container
      }>
        <FlatList
          data={[
            {key:'NN'},
            {key:'BB'},
            {key:'0'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
      </View>

      <View style={
        styles.container
      }>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 0,
        paddingTop: 20,
        backgroundColor: '#fff'
    },
    sectionHeader: {
        backgroundColor: 'rgba(254,254,254,1)',
        height: 20,
        textAlign: 'left',
    },
    item: {
      padding: 10,
      fontSize: 15,
      height: 44,
      backgroundColor: '#eee',
    }
})
*/
// class ABCD extends Component {
//   render() {
//     return (
//       <View>
//         <View style={{width: 50, height: 50}} />
//         <View style={{width: 100, height: 100}} />
//         <View style={{width: 150, height: 150}} />
//       </View>
//     );
//   }
// };
// // 注册应用(registerComponent)后才能正确渲染
// // 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
// AppRegistry.registerComponent('Test', () => ABCD);

// export default class LotsOfStyles extends Component {
//   render() {
//     return (
//       <View>
//         <Text style={styles.red}>just red</Text>
//         <Text style={styles.bigblue}>just bigblue</Text>
//         <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
//         <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   bigblue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   red: {
//     color: 'red',
//   },
// });
//
// AppRegistry.registerComponent('LotsOfStyles', () => LotsOfStyles);

// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showText: true };
//
//     // 每1000毫秒对showText状态做一次取反操作
//     setInterval(() => {
//       this.setState(previousState) => {
//         return { showText: !previousState.showText };
//       });
//     }, 1000);
//   }
//
//   render() {
//     // 根据当前showText的值决定是否显示text内容
//     let display = this.state.showText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }
//
// export default class BlinkApp extends Component {
//   render() {
//     return (
//       <View>
//         <Blink text='I love to blink' />
//         <Blink text='Yes blinking is so great' />
//         <Blink text='Why did they ever take this out of HTML' />
//         <Blink text='Look at me look at me look at me' />
//       </View>
//     );
//   }
// }

// export default class Bananas extends Component {
//   render() {
//     let pic = {
//       uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <View style={{backgroundColor:'#0f0', height:200}}>
//         <Image source={pic} style={{width: 320, height:180, top: 20}}/>
//
//       </View>
//       );
//   }
// }

// class
// class Greeting extends Component {
//   render() {
//     return (
//         <Text>Hellow {this.props.name}!</Text>
//       );
//   }
// }
//
// export default class LotsOfGreetings extends Component {
//   render() {
//     return (
//       <View style={{alignItems: 'center'}}>
//         <Greeting name='Rexxar' />
//         <Greeting name='Jaina' />
//         <Greeting name='Valeera' />
//       </View>
//   }
// }

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }



/*
PRO TIP
 When you see Red Box with stack trace, you can click any
 stack frame to jump to the source file. The packager will launch your
 editor of choice. It will first look at REACT_EDITOR environment
 variable, then at EDITOR. To set it up, you can add something like
 export REACT_EDITOR=atom to your ~/.bashrc or ~/.zshrc depending on
 which shell you use.
*/
