// https://github.com/zmxv/react-native-sound
'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
var Sound = require('react-native-sound');
var RNFS = require('react-native-fs');

export default class MainView extends Component {
  render() {
    return <View style={styles.container}>
             <TouchableOpacity onPress={this.playSound}>
               <Text style={styles.button}>hello</Text>
             </TouchableOpacity>
           </View>;
  }

  playSound() {
    // todo: download
    console.log('playSOund')
    const url = 'http://downdb.51voa.com/201604/fusion-reactor-still-in-works.mp3'
    const file = RNFS.DocumentDirectoryPath + '/fusion.mp3'
    console.log(url)
    console.log(' => ',  file)
    RNFS.downloadFile(url, file, (d) => {
      console.log('downloading', d)
    }, (d) => {
      // console.log(`${d.bytesWritten} / ${d.contentLength}`)
    })
    .then(() => {
      console.log('downloaded')

      // fixme: https://github.com/zmxv/react-native-sound/issues/27
      // var s = new Sound('advertising.mp3', Sound.MAIN_BUNDLE, (e) => {
      // var s = new Sound(file + '.aa', Sound.MAIN_BUNDLE, (e) => {
      var s = new Sound(file, '/', (e) => { // hack
        if (e) {
          console.log('error', e);
        } else {
          console.log('duration', s.getDuration());
          s.play();
        }
      });
    })
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'silver',
    padding: 5,
  },
});

export default MainView;
