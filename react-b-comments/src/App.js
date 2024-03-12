import './App.scss'
import avatar from './images/bozai.png'
import { useState} from 'react'
import _, { takeRight } from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
import dayjs from 'dayjs'
import { useRef } from 'react'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: 'Jay Zhou',
    },
    // 评论内容
    content: 'Not bad',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: 'Taylor',
    },
    content: 'Cruel Summer',
    ctime: '11-13 11:29',
    like: 77,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'Heima',
    },
    content: 'I like this video',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: 'Heima',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: 'Hot' },
  { type: 'time', text: 'Latest' },
]

const App = () => {
  const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'like', 'desc'))

  // del function
  const handleDel = (id) => {
    console.log(id)
    // filter the comment list
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  // tab change function
  const [type, setType] = useState('hot')
  const handleTabChange = (type) => {
    setType(type)
    // order function
    if (type === 'hot') {
      // order by likes
      // lodash: 封装了很多函数和方法的工具库
      setCommentList(_.orderBy(commentList, 'like', 'desc'))
    } else {
      // order by time
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'))

    }
  }


  // publish comments
  const [content, setContent] = useState('')
  const inputRef = useRef(null)
  const handlePublish = () => {
    setCommentList([
      ...commentList, // 打开这个数组
      {
        // 评论id
        rpid: uuidV4(),
        // 用户信息
        user: {
          uid: '13258165',
          avatar: '',
          uname: 'Jay Zhou',
        },
        // 评论内容
        content: content,
        // 评论时间
        // ctime: '10-16 08:15',  // 格式化 m-d h:minutes
        ctime: dayjs(new Date()).format('MM-DD hh:mm'),
        like: 22,
      }
    ])
    // clear content in the input box
    setContent('')
    // 重新聚焦
    inputRef.current.focus()

  }

  // clear the input content
  const clearContent = () => {

  }
  
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => <span 
              key={item.type} 
              onClick={() => handleTabChange(item.type)} 
              // className={`nav-item ${type === item.type && 'active'}`}
              className={classNames('nav-item', { active: type === item.type})}
            >{item.text}</span>)}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="publish a comment here"
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
            
              <div className="send-text" onClick={handlePublish}>publish</div>
              
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map(item=>(
            <div key={item.rpid} className="reply-item">
                      {/* 头像 */}
                      <div className="root-reply-avatar">
                        <div className="bili-avatar">
                          <img
                            className="bili-avatar-img"
                            alt=""
                            src={item.user.avatar}
                          />
                        </div>
                      </div>
          
                      <div className="content-wrap">
                        {/* 用户名 */}
                        <div className="user-info">
                          <div className="user-name">{item.user.uname}</div>
                        </div>
                        {/* 评论内容 */}
                        <div className="root-reply">
                          <span className="reply-content">{item.content}</span>
                          <div className="reply-info">
                            {/* 评论时间 */}
                            <span className="reply-time">{item.ctime}</span>
                            {/* 评论数量 */}
                            <span className="reply-time">likes:{item.like}</span>

                            {/*user == item.user.id? */}
                            { user.uid === item.user.uid &&
                              <span className="delete-btn" onClick={()=>handleDel(item.rpid)}>
                                delete
                              </span>
                            }
                            
          
                          </div>
                        </div>
                      </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default App