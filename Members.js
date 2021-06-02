import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddMembersModal} from './AddMembersModal';
import {EditMembersModal} from './EditMembersModal';

export class Members extends Component{

    constructor(props){
        super(props);
        this.state={mbs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Members')
        .then(response=>response.json())
        .then(data=>{
            this.setState({mbs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteMb(mbid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Members/'+mbid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {mbs, mbid,mbname,mob,mail,bdate,mbphoto}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MemberID</th>
                        <th>MemberName</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>BirthDate</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mbs.map(mb=>
                            <tr key={mb.MemberID}>
                                <td>{mb.MemberID}</td>
                                <td>{mb.MemberName}</td>
                                <td>{mb.Mobile}</td>
                                <td>{mb.Email}</td>
                                <td>{mb.BirthDate}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        mbid:mb.MemberID,mbname:mb.MemberName,mob:mb.Mobile,
        mail:mb.Email,bdate:mb.BirthDate,mbphoto:mb.MemberPhoto})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteMb(mb.MemberID)}>
            Delete
        </Button>

        <EditMembersModal show={this.state.editModalShow}
        onHide={editModalClose}
        mbid={mbid}
        mbname={mbname}
        mob={mob}
        mail={mail}
        bdate={bdate}
        mbphoto={mbphoto}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Member</Button>

                    <AddMembersModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}