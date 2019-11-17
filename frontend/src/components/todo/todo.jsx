import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Navbar from '../Navbar/navbar';
import Checkbox from '@material-ui/core/Checkbox';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBInput } from 'mdbreact';
import BASE_URL, {getHeaders} from '../../config/config';
import Modal from '../modals/modal';



class Todo extends Component {
    state = { 
        buckets : [],
        isModalOpen : false
     }

    componentDidMount() {
        axios.get(BASE_URL + '/todo/api/buckets',{headers : getHeaders()})
        .then(res => {
            console.log(res)
            this.setState({buckets : res.data})
        })
    }


    handleTaskStatusUpdate = (id, status) => {
        axios.put(BASE_URL + `/todo/api/tasks/${id}`, {}, {headers : getHeaders()})
        .then(res => {
            if(res.status === 200) {

                let clonedBuckets = [...this.state.buckets]
                console.log(clonedBuckets)
                clonedBuckets = clonedBuckets.map(bucket => {
                    let newTasks = bucket.tasks.map(task => {
                        if(task.id===id) {
                            let newTask = {...task}
                            newTask['is_done'] = status 
                            
                            console.log(newTask)
                            return newTask
                        }
                        return {...task}
                    })

                    return {...bucket, tasks : newTasks}

                })
                console.log(clonedBuckets)
                this.setState({buckets : clonedBuckets})
            }
        })
        .catch(err => {
          alert('could not update task')
          
        })
    }


    handleDelete = (id) => {
        axios.delete(BASE_URL + `/todo/api/tasks/${id}`, {headers :getHeaders()})
        .then(res => {
            if(res.status === 200 || true) {

                let clonedBuckets = [...this.state.buckets]
                console.log(clonedBuckets)
                clonedBuckets = clonedBuckets.map(bucket => {
                    let newTasks = bucket.tasks.map(task => {
                        if(task.id===id) {
                            return null
                        }
                        return {...task}
                    })

                    newTasks = newTasks.filter(item => item !== null)
                    return {...bucket, tasks : newTasks}

                })
                console.log(clonedBuckets)
                this.setState({buckets : clonedBuckets})
            } 
            })
        .catch(err => {

        })
    }

    handleEdit = (id) => {
        this.setState({[`isModal${id}Open`] : true})
    }

    handleEditSave = (id, text) => {
      axios.put(BASE_URL + '/todo/api/tasks/' + id , {text : text}, {headers :getHeaders()})
      .then(res => {
        console.log(res)
        if(res.status === 200){

                let clonedBuckets = [...this.state.buckets]
                clonedBuckets = clonedBuckets.map(bucket => {
                    let newTasks = bucket.tasks.map(task => {
                        if(task.id===id) {
                            let newTask = {...task}
                            newTask.text = text
                            
                            console.log(newTask)
                            return newTask
                        }
                        return {...task}
                    })

                    return {...bucket, tasks : newTasks}

                })
                console.log(clonedBuckets)
                this.setState({buckets : clonedBuckets})
          this.setState({[`isModal${id}Open`] : false})
        }
        else{
          alert('update failed')
        }
      })
      .catch(err => {
        alert('update failed')
      })
    }


    handleBucketDelete = (id) => {
      axios.delete(BASE_URL + `/todo/api/buckets/${id}`,{headers:getHeaders()})
      .then(res => {
        if(res.status === 200) {
          let clonedBuckets = this.state.buckets.filter(item => item.id !== id)
          this.setState({buckets : clonedBuckets})
        }
      })
    }


    handleAddTask = (id, text,bucketId) => {
      axios.post(BASE_URL + '/todo/api/tasks', {bucket : bucketId, text : text}, {headers :getHeaders()})
      .then(res => {
        if(res.status === 200) {
        axios.get(BASE_URL + '/todo/api/buckets',{headers :getHeaders()})
        .then(res => {
            console.log(res)
            this.setState({buckets : res.data})
        })
          this.setState({[`isModal${bucketId}OpenAddTask`] : false})
        }
        else alert('Could not add task')
      })
    }


    handleAddBucket = (id,text,bucketId) => {
      axios.post(BASE_URL + '/todo/api/buckets',{name : text},{headers : getHeaders()})
      .then(res => {
        if(res.status === 200) {

          this.setState({isModalAddBucketOpen : false})

        axios.get(BASE_URL + '/todo/api/buckets',{headers : getHeaders()})
        .then(res => {
            console.log(res)
            this.setState({buckets : res.data})
        })
        }
      })
      .catch(err => {
        alert('could not create bucket')
      })
    }

    handleLogout = () => {
      console.log('hi')
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      this.props.history.push('/')
    }
    


    render() { 
        
        console.log(this.state)
        console.log(this.props) 
        return ( 
            <React.Fragment>
                <Navbar heading={this.props.user.userName} handleLogOut = {this.handleLogout} lastLogin = {this.props.user.lastLogin}/>
                {
                    this.state.buckets.map(item => {

                        return(
                            
                <div className="mt-5 mr-5">
                  <MDBCol className="ml-5 pl-5 mr-5 pr-5" md="12">
                    <MDBCard style={{ width: "100%" }}>
                      <MDBCardBody>
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-10">
                              <MDBCardTitle>{item.name}</MDBCardTitle>
                            </div>
                              
                              <div className="col-sm-1 pt-2">
                              <MDBIcon style={{cursor : 'pointer'}} icon="plus-square" onClick={() => this.setState({[`isModal${item.id}OpenAddTask`]: true})}/>
                              </div>
                              <div className="col-sm-1 pt-2">
                              <MDBIcon style={{cursor : 'pointer'}} icon="trash" onClick={() => this.handleBucketDelete(item.id)}/>
                              </div>

                          </div>

                  <Modal 
                  type = "ADD_TASK"
                  bucketId = {item.id}
                  title = "Add Task"
                  handleClose = {() => this.setState({[`isModal${item.id}OpenAddTask`] : false})} 
                  isOpen={this.state[`isModal${item.id}OpenAddTask`]}
                  handleSave = {this.handleAddTask}
                  />
                        </div>

                        <div className="container">
                          <hr />
                          {
                              item.tasks.map(task => {
                               return (
                                    
                          <div className="row">
                            <div className="col-sm-9 pt-3">
                              <MDBCardText>
                                {task.text}
                              </MDBCardText>
                            </div>
                            <div className="col-sm-1">
                              <Checkbox name="ajit" checked={task.is_done} onClick={(e) => this.handleTaskStatusUpdate(task.id,e.target.checked)}/>
                            </div>
                            <div
                              className="col-sm-1"
                              style={{
                                paddingTop: 10,
                                cursor: "pointer",
                                paddingLeft: 20
                              }}
                            >
                              <MDBIcon icon="trash" onClick={() => this.handleDelete(task.id)}/>
                            </div>
                              
                            <div
                              className="col-sm-1"
                              style={{
                                paddingTop: 10,
                                cursor: "pointer",
                                paddingLeft: 15
                              }}
                            >
                              <MDBIcon icon="edit" onClick={() => this.handleEdit(task.id)}/>
                            </div>

                  <Modal 
                  type = "EDIT"
                  id = {task.id}
                  title = "Edit Task"
                  value = {task.text}
                  handleClose = {() => this.setState({[`isModal${task.id}Open`] : false})} 
                  isOpen={this.state[`isModal${task.id}Open`]}
                  handleSave = {this.handleEditSave}
                  />
                          </div>
                               ) 
                              })
                          }
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </div>
                        )
                        
                    })
                }

            <div className="container">


                <div className="ml-5 mt-5" style={{textAlign:'center'}}>
                    
                <MDBBtn color="primary" className="ml-5" onClick={() => this.setState({isModalAddBucketOpen: true})}>Add Bucket</MDBBtn>

                  <Modal 
                  type = "ADD_BUCKET"
                  title = "Add Bucket"
                  value = {''}
                  handleClose = {() => this.setState({[`isModalAddBucketOpen`] : false})} 
                  isOpen={this.state[`isModalAddBucketOpen`]}
                  handleSave = {this.handleAddBucket}
                  />
                </div>
            </div>
            </React.Fragment>
            );
    }
}


const mapStateToProps = state => {
    console.log(state)
    const {user}=state.userReducer
    console.log(user)
    return   {user}
}
export default connect(mapStateToProps)(Todo) 

 