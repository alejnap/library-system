import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddIssueBookModal} from './AddIssueBookModal';
import {EditIssueBookModal} from './EditIssueBookModal';


export class IssueBook extends Component{

    constructor(props){
        super(props);
        this.state={isbks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'IssueBook')
        .then(response=>response.json())
        .then(data=>{
            this.setState({isbks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteIssuedBook(isbkid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'IssueBook/'+isbkid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {isbks, isbkid,isbkname,isauth,ismemid,ismemname,is_issuedate,is_duedate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BookID</th>
                        <th>BookName</th>
                        <th>Author</th>
                        <th>MemberID</th>
                        <th>MemberName</th>
                        <th>IssueDate</th>
                        <th>DueDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isbks.map(isbk=>
                            <tr key={isbk.BookID}>
                                <td>{isbk.BookID}</td>
                                <td>{isbk.BookName}</td>
                                <td>{isbk.Author}</td>
                                <td>{isbk.MemberID}</td>
                                <td>{isbk.MemberName}</td>
                                <td>{isbk.IssueDate}</td>
                                <td>{isbk.DueDate}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        isbkid:isbk.BookID,isbkname:isbk.BookName,isauth:isbk.Author,
        ismemid:isbk.MemberID,ismemname:isbk.MemberName,is_issuedate:isbk.IssueDate,is_duedate:isbk.DueDate})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteIssuedBook(isbk.BookID)}>
            Delete
        </Button>

        <EditIssueBookModal show={this.state.editModalShow}
        onHide={editModalClose}
        isbkid={isbkid}
        isbkname={isbkname}
        isauth={isauth}
        ismemid={ismemid}
        ismemname={ismemname}
        is_issuedate={is_issuedate}
        is_duedate={is_duedate}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Issue Book</Button>

                    <AddIssueBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}