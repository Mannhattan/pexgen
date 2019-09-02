import React, { Component } from 'react';
import styled from 'styled-components';



class PlayerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prefix: "",
            name: "",
            suffix: "",
            groups: [],
            permissions: []
        }
    }

    componentWillMount() {
        if(this.props.openedPlayer != null)
            Object.keys(this.props.players).forEach((key, id) => {
                // console.log(key +" "+ this.state.groups[key] +" "+ id);
                // groups.push(this.state.groups[group]);
                // console.log(this.props.id);
                if(this.props.openedPlayer == id) {
                    this.setState({
                        prefix: this.props.players[key].prefix,
                        name: key,
                        suffix: this.props.players[key].prefix,
                        groups: this.props.players[key].groups,
                        permissions: this.props.players[key].permissions
                    })
                }
            });
    }

    savePlayer = () => {
        if(this.props.openedPlayer != null)
            this.props.savePlayer(this.props.openedPlayer, this.state);
        else this.props.savePlayer(null, this.state);
    }

    changePrefix = (event) => {
        this.setState({prefix: event.target.value});
    }

    changeName = (event) => {
        this.setState({name: event.target.value});
    }

    changeSuffix = (event) => {
        this.setState({suffix: event.target.value});
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
            <section className="player_modal">
                <div className="content">
                    <div className="general">
                        <h1>{this.props.openedGroup == null ? "New player" : "Edit player"}</h1>
                        
                        <p>Prefix:</p>
                        <input type="text" name="" id="" defaultValue={this.state.prefix} onChange={() => this.changePrefix(event)} />

                        <p>Name:</p>
                        <input type="text" name="" id="" defaultValue={this.state.name} onChange={() => this.changeName(event)} />

                        <p>Suffix:</p>
                        <input type="text" name="" id="" defaultValue={this.state.prefix} onChange={() => this.changePrefix(event)} />

                        <div className="controls">
                            <a onClick={this.props.controlPlayerModal} className="cancel">Cancel</a>
                            <a onClick={this.savePlayer} className="save">Save player</a>
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

export default PlayerModal;