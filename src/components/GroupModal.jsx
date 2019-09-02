import React, { Component } from 'react';
import styled from 'styled-components';



class GroupModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            prefix: "",
            inheritance: "",
            default: false,
            build: false,
            permissions: []
        }
    }

    componentWillMount() {
        if(this.props.openedGroup != null)
            Object.keys(this.props.groups).forEach((key, id) => {
                // console.log(key +" "+ this.state.groups[key] +" "+ id);
                // groups.push(this.state.groups[group]);
                // console.log(this.props.id);
                if(this.props.openedGroup == id) {
                    this.setState({
                        name: key,
                        prefix: this.props.groups[key].prefix,
                        inheritance: this.props.groups[key].inheritance,
                        default: this.props.groups[key].default,
                        build: this.props.groups[key].build,
                        permissions: this.props.groups[key].permissions
                    })
                }
            });
    }

    saveGroup = () => {
        if(this.props.openedGroup != null)
            this.props.saveGroup(this.props.openedGroup, this.state);
        else this.props.saveGroup(null, this.state);
    }

    changeName = (event) => {
        this.setState({name: event.target.value});
    }

    changePrefix = (event) => {
        this.setState({prefix: event.target.value});
    }

    getInheritance = () => {
        var groupNames = [];

        Object.keys(this.props.groups).forEach((group, id) => {
            groupNames.push(<option value={group} key={id}>{group}</option>);
        });

        groupNames.push(<option value={"NONE"}>NONE</option>);

        return groupNames;
    }

    changeInheritance = (event) => {
        this.setState({inheritance: event.target.value});
    }

    checkDefault = () => {
        return this.props.defaultAt != null ? ((this.props.openedGroup == this.props.defaultAt) ? false : true) : false;
    }

    changeDefault = (event) => {
        this.setState({default: event.target.checked});
    }

    changeBuild = (event) => {
        this.setState({build: event.target.checked});
    }



    addPermission = () => {
        if(this.permission_input.value != "") {
            var permissions = this.state.permissions;
            permissions.unshift(this.permission_input.value);
            this.setState({permissions: permissions});
    
            this.permission_input.value = "";
        }
    }

    removePermission = (id) => {
        var permissions = this.state.permissions;
        permissions.splice(id,1);
        this.setState({permissions: permissions});
    }

    render() {
        return (
            <section className="group_modal">
                <div className="content">
                    <div className="general">
                        <h1>{this.props.openedGroup == null ? "New group" : "Edit group"}</h1>
                        
                        <p>Name:</p>
                        <input type="text" name="" id="" defaultValue={this.state.name} onChange={() => this.changeName(event)} />

                        <p>Prefix:</p>
                        <input type="text" name="" id="" defaultValue={this.state.prefix} onChange={() => this.changePrefix(event)} />
                        
                        <p>Inheritance:</p>
                        <select onChange={() => this.changeInheritance(event)} value={this.state.inheritance}>
                            {/* {this.props.groups.map((group, id) => (
                                <option 
                                    value={group.name} 
                                    key={id}>
                                    {group.name}
                                </option>
                            ))} */}
                            {this.getInheritance()}
                            {/* <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> */}
                        </select>

                        <p><input type="checkbox" disabled={this.checkDefault()} name="" id="default" checked={this.state.default} onChange={(event) => this.changeDefault(event)} /><label htmlFor="default">Set this group as default</label></p>
                        <p><input type="checkbox" name="" id="build" checked={this.state.build} onChange={(event) => this.changeBuild(event)} /><label htmlFor="build">Permission to build</label></p>

                        <div className="controls">
                            <a onClick={this.props.controlGroupModal} className="cancel">Cancel</a>
                            <a onClick={this.saveGroup} className="save">Save group</a>
                        </div>
                    </div>
                    
                    <div className="permissions">
                        <div className="permissions_input_wrapper">
                            <input type="text" placeholder="Add new permission" ref={(permission_input) => { this.permission_input = permission_input }}/>
                            <a onClick={this.addPermission} className="add_permission"><i className="fas fa-plus"></i></a>
                        </div>

                        <div className="permissions_wrapper">
                            <div className="scroll">
                                {Array.isArray(this.state.permissions) && this.state.permissions.length > 0 ? this.state.permissions.map((permission, id) => (
                                    <div className="item" key={id}>
                                        <p className="perm">{permission}</p>
                                        <a onClick={() => this.removePermission(id)}><i className="fas fa-times"></i></a>
                                    </div>
                                )) : <div className="empty"></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default GroupModal;