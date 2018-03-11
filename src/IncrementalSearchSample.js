import React, { Component } from 'react';

import './style.css';

const randomStr = len => {
  const c = "abc";
  const cl = c.length;

  let r = "";
  for (let i = 0; i < len; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
};

class IncrementalSearchSample extends Component {

  constructor(props) {
    super(props);

    this.textData = [];
    for(let i=0; i < 100; ++ i) {
      this.textData.push( { num: (i+1), text: randomStr(64) } );
    }
  }

  componentDidMount() {
    this.setState({ search: '' });
  }


  textChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    if (!this.state) return null;

    let matchData;

    if (this.state.search.length > 0) {
      const reg = new RegExp(this.state.search, 'g');
      matchData =
        this.textData
          .filter(e => e.text.match(reg))
          .map(e => {
            const text2 = e.text.replace(reg, `<span class="emphasize">${this.state.search}</span>`);
            return { num: e.num, text: <span dangerouslySetInnerHTML={{ __html: text2 }} />, matchCount: text2.match(/emphasize/g).length };
          })
          .sort((e1, e2) => ( e2.matchCount - e1.matchCount));
    }
    else {
      matchData = this.textData;
    }

    return (
      <div>
        <div className='search_input'>
          <input type="text" onChange={this.textChange.bind(this)}/><i className="fas fa-search fa-lg"></i>
        </div>
        <div className='text_items'>
          <ul>
          {
            matchData.map(e => <li key={Math.random()}>{e.num < 10 ? <span>&nbsp;&nbsp;</span> : ''}<span className='number'>{e.num}:</span>&nbsp;&nbsp;{e.text}</li>)
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default IncrementalSearchSample;
