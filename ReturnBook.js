import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddReturnBookModal} from './AddReturnBookModal';
import {EditReturnBookModal} from './EditReturnBookModal';


export class ReturnBook extends Component{

    constructor(props){
        super(props);
        this.state={rebks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'ReturnBook')
        .then(response=>response.json())
        .then(data=>{
            this.setState({rebks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteReturnedBook(rememid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'ReturnBook/'+rememid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {rebks, rememid,rememname,rebkid,rebkname,reauth,re_issuedate,re_duedate,re_returndate,refine}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MemberID</th>
                        <th>MemberName</th>
                        <th>BookID</th>
                        <th>BookName</th>
                        <th>Author</th>
                        <th>IssueDate</th>
                        <th>DueDate</th>
                        <th>ReturnDate</th>
                        <th>Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rebks.map(rebk=>
                            <tr key={rebk.MemberID}>
                                <td>{rebk.MemberID}</td>
                                <td>{rebk.MemberName}</td>
                                <td>{rebk.BookID}</td>
                                <td>{rebk.BookName}</td>
                                <td>{rebk.Author}</td>
                                <td>{rebk.IssueDate}</td>
                                <td>{rebk.DueDate}</td>
                                <td>{rebk.ReturnDate}</td>
                                <td>{rebk.Fine}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        rememid:rebk.MemberID,rememname:rebk.MemberName,rebkid:rebk.BookID,
        rebkname:rebk.BookName,reauth:rebk.Author,re_issuedate:rebk.IssueDate,re_duedate:rebk.DueDate,re_returndate:rebk.ReturnDate,refine:rebk.Fine})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteReturnedBook(rebk.MemberID)}>
            Delete
        </Button>

        <EditReturnBookModal show={this.state.editModalShow}
        onHide={editModalClose}
        rememid={rememid}
        rememname={rememname}
        rebkid={rebkid}
        rebkname={rebkname}
        reauth={reauth}
        re_issuedate={re_issuedate}
        re_duedate={re_duedate}
        re_returndate={re_returndate}
        refine={refine}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Return Book</Button>

                    <AddReturnBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}