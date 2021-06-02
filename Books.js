import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBooksModal} from './AddBooksModal';
import {EditBooksModal} from './EditBooksModal';

export class Books extends Component{

    constructor(props){
        super(props);
        this.state={bks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteBk(bkid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Book/'+bkid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {bks, bkid,bkname,det,auth,genbk,bkphoto}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BookID</th>
                        <th>BookName</th>
                        <th>Detail</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bks.map(bk=>
                            <tr key={bk.BookID}>
                                <td>{bk.BookID}</td>
                                <td>{bk.BookName}</td>
                                <td>{bk.Detail}</td>
                                <td>{bk.Author}</td>
                                <td>{bk.Genre}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        bkid:bk.BookID,bkname:bk.BookName,det:bk.Detail,
        auth:bk.Author,genbk:bk.Genre,bkphoto:bk.BookPhoto})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteBk(bk.BookID)}>
            Delete
        </Button>

        <EditBooksModal show={this.state.editModalShow}
        onHide={editModalClose}
        bkid={bkid}
        bkname={bkname}
        det={det}
        auth={auth}
        genbk={genbk}
        bkphoto={bkphoto}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Book</Button>

                    <AddBooksModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}