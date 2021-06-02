import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditMembersModal extends Component{
    constructor(props){
        super(props);
        this.state={mbs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Members')
        .then(response=>response.json())
        .then(data=>{
            this.setState({mbs:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Members',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                MemberName:event.target.MemberName.value,
                Mobile:event.target.Mobile.value,
                Email:event.target.Email.value,
                BirthDate:event.target.BirthDate.value,
                MemberPhoto:this.photofilename

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

        fetch(process.env.REACT_APP_API+'Members/SaveFile',{
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
            Edit Member Info
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="MemberID">
                        <Form.Label>MemberID</Form.Label>
                        <Form.Control type="text" name="MemberID" required 
                        placeholder="MemberID"
                        disabled
                        defaultValue={this.props.mbid}/>
                    </Form.Group>

                    <Form.Group controlId="MemberName">
                        <Form.Label>MemberName</Form.Label>
                        <Form.Control type="text" name="MemberName" required 
                        defaultValue={this.props.mbname}
                        placeholder="MemberName"/>
                    </Form.Group>

                    <Form.Group controlId="Mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" name="Mobile" required 
                        defaultValue={this.props.mob}
                        placeholder="Mobile"/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="Email" required 
                        defaultValue={this.props.mail}
                        placeholder="Email"/>
                    </Form.Group>


                    <Form.Group controlId="BirthDate">
                        <Form.Label>BirthDate</Form.Label>
                        <Form.Control 
                        type="date"
                        name="BirthDate"
                        required
                        placeholder="BirthDate"
                        defaultValue={this.props.bdate}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Member Info
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