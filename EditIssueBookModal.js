import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditIssueBookModal extends Component{
    constructor(props){
        super(props);
        this.state={isbks:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'IssueBook')
        .then(response=>response.json())
        .then(data=>{
            this.setState({isbks:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'IssueBook',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookName:event.target.BookName.value,
                Author:event.target.Author.value,
                MemberID:event.target.MemberID.value,
                MemberName:event.target.MemberName.value,
                IssueDate:event.target.IssueDate.value,
                DueDate:event.target.DueDate.value

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'IssueBook/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit 
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="BookID">
                        <Form.Label>BookID</Form.Label>
                        <Form.Control type="text" name="BookID" required 
                        placeholder="BookID"
                        disabled
                        defaultValue={this.props.isbkid}/>
                    </Form.Group>

                    <Form.Group controlId="BookName">
                        <Form.Label>BookName</Form.Label>
                        <Form.Control type="text" name="BookName" required 
                        defaultValue={this.props.isbkname}
                        placeholder="BookName"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="Author" required 
                        defaultValue={this.props.isauth}
                        placeholder="Author"/>
                    </Form.Group>

                    <Form.Group controlId="MemberID">
                        <Form.Label>MemberID</Form.Label>
                        <Form.Control type="text" name="MemberID" required 
                        defaultValue={this.props.ismemid}
                        placeholder="MemberID"/>
                    </Form.Group>

                    <Form.Group controlId="MemberName">
                        <Form.Label>MemberName</Form.Label>
                        <Form.Control type="text" name="MemberName" required 
                        defaultValue={this.props.ismemname}
                        placeholder="MemberName"/>
                    </Form.Group>


                    <Form.Group controlId="IssueDate">
                        <Form.Label>IssueDate</Form.Label>
                        <Form.Control 
                        type="date"
                        name="IssueDate"
                        required
                        placeholder="IssueDate"
                        defaultValue={this.props.is_issuedate}
                        />
                    </Form.Group>

                    <Form.Group controlId="DueDate">
                        <Form.Label>DueDate</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DueDate"
                        required
                        placeholder="DueDate"
                        defaultValue={this.props.is_duedate}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update 
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}