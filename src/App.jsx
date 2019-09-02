import React, { Component } from 'react';
import styled from 'styled-components';
// import YAML from 'json-to-pretty-yaml';
import YAML from 'js-yaml';

import css from './App.scss';

import GroupModal from './components/GroupModal.jsx';
import PlayerModal from './components/PlayerModal.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yaml: {
                groups: [],
                players: [],
            },
            groups: {
                // "group 1": {
                //     prefix: "[ADMIN] ",
                //     inheritance: "group2",
                //     default: false,
                //     build: false,
                //     permissions: [
                //         "essentials.lightning",
                //         "essentials.socialspy",
                //         "essentials.vanish",
                //         "essentials.sethome.*"
                //     ]
                // },
                // "group 2": {
                //     prefix: "[ADMIN] ",
                //     inheritance: "group2",
                //     default: false,
                //     build: false,
                //     permissions: [
                //         "essentials.lightning",
                //         "essentials.socialspy",
                //         "essentials.vanish",
                //         "essentials.sethome.*"
                //     ]
                // },
                // "group 3": {
                //     prefix: "[ADMIN] ",
                //     inheritance: "group2",
                //     default: false,
                //     build: false,
                //     permissions: [
                //         "essentials.lightning",
                //         "essentials.socialspy",
                //         "essentials.vanish",
                //         "essentials.sethome.*"
                //     ]
                // }
            },
            players: {
                // "player 1": {
                //     prefix: "[Gracz] ",
                //     name: "Finrael",
                //     suffix: "",
                //     groups: [
                //         "group 1",
                //         "group 2"
                //     ],
                //     permissions: [
                //         "essentials.socialspy",
                //         "essentials.vanish"
                //     ]
                // },
                // "player 2": {
                //     prefix: "[Gracz] ",
                //     name: "Finrael",
                //     suffix: "",
                //     groups: [
                //         "group 1",
                //         "group 2"
                //     ],
                //     permissions: [
                //         "essentials.socialspy",
                //         "essentials.vanish"
                //     ]
                // }
            },

            isGroupModalOpened: false,
            openedGroup: null,
            isPlayerModalOpened: false,
            openedPlayer: null,

            defaultAt: null
        }
    }

    getGroups = () => {
        var groups = [];

        Object.keys(this.state.groups).forEach((key, id) => {
            // console.log(key +" "+ this.state.groups[key] +" "+ id);
            var fragment = (<div className="group_item" key={id}>
                <h3>{key}</h3>

                <div className="controls">
                    <a onClick={() => this.controlGroupModal(id)}><i className="fas fa-pen"></i></a>
                    <a onClick={() => this.removeGroup(id)}><i className="fas fa-times"></i></a>
                </div>
            </div>);

            groups.push(fragment);
        })

        return groups;
    }

    getPlayers = () => {
        var players = [];

        Object.keys(this.state.players).forEach((key, id) => {
            // console.log(key +" "+ this.state.groups[key] +" "+ id);
            var fragment = (<div className="player_item" key={id}>
                <h3>{key}</h3>

                <div className="controls">
                    <a onClick={() => this.controlPlayerModal(id)}><i className="fas fa-pen"></i></a>
                    <a onClick={() => this.removePlayer(id)}><i className="fas fa-times"></i></a>
                </div>
            </div>);

            players.push(fragment);
        })

        return players;
    }

    controlGroupModal = (id) => {
        if(id != null)
            this.setState({isGroupModalOpened: !this.state.isGroupModalOpened, openedGroup: id});
        else this.setState({isGroupModalOpened: !this.state.isGroupModalOpened, openedGroup: null});
    }



    addToObject = (obj, key, value, index) => {
        // Create a temp object and index variable
        var temp = {};
        var i = 0;
    
        // Loop through the original object
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
    
                // If the indexes match, add the new item
                if (i === index && key && value) {
                    temp[key] = value;
                }
    
                // Add the current item in the loop to the temp obj
                temp[prop] = obj[prop];
    
                // Increase the count
                i++;
    
            }
        }
    
        // If no index, add to the end
        if (!index && key && value) {
            temp[key] = value;
        }
    
        return temp;
    
    };

    saveGroup = (id, newGroup) => {
        var groups = this.state.groups;

        if(id == null) {
            // Object.keys(this.state.groups).forEach((key, id) => {
            //     // console.log(key +" "+ this.state.groups[key] +" "+ id);
                
    
            //     groups.push(e);
            // })

            // groups.push(newGroup);

            groups[newGroup.name] = {
                prefix: newGroup.prefix,
                inheritance: newGroup.inheritance,
                default: newGroup.default,
                build: newGroup.build,
                permissions: newGroup.permissions
            }

            this.setState({
                groups: groups, 
                isGroupModalOpened: !this.state.isGroupModalOpened, 
                openedGroup: null
            });
        }
        else {
            Object.keys(groups).forEach((key, idOfKey) => {
                if(id == idOfKey) {
                    // console.log(key +" "+ groups[key] +" "+ id);
                    // console.log(key +" "+ newGroup.name +" "+ id);

                    // Object.defineProperty(groups, newGroup.name, Object.getOwnPropertyDescriptor(groups, key));
                    // groups[newGroup.name] = groups[key];

                    

                    var temp = {
                        prefix: newGroup.prefix,
                        inheritance: newGroup.inheritance,
                        default: newGroup.default,
                        build: newGroup.build,
                        permissions: newGroup.permissions
                    }

                    if(groups[key] != newGroup.name)
                        delete groups[key];

                    groups = this.addToObject(groups, newGroup.name, temp, idOfKey);  
                };
            });

            this.setState({
                groups: groups, 
                isGroupModalOpened: !this.state.isGroupModalOpened, 
                openedGroup: null
            });
        }

        // var defaultCheck = false;

        // groups.map((g) => {
        //     defaultCheck = defaultCheck + g.default;
        // });

        // console.log(groups.some(group => group.default == true));

        // if(groups.some(group => group.default == true) == false && groups[id].default == true) {
        //     this.setState({
        //         groups: groups, 
        //         isGroupModalOpened: !this.state.isGroupModalOpened, 
        //         openedGroup: null, 
        //         defaultAt: id
        //     });
        // }

        // else if(groups.some((group) => group.default == true) == true && this.state.defaultAt == id)
        //     this.setState({
        //         groups: groups, 
        //         isGroupModalOpened: !this.state.isGroupModalOpened, 
        //         openedGroup: null, 
        //         defaultAt: null
        //     });

        // if(defaultCheck == true && this.state.defaultAt != id)
        //     this.setState({
        //         groups: groups, 
        //         isGroupModalOpened: !this.state.isGroupModalOpened, 
        //         openedGroup: null
        //     });

        // else if(this.state.defaultAt == id)
        //     this.setState({
        //         groups: groups, 
        //         isGroupModalOpened: !this.state.isGroupModalOpened, 
        //         openedGroup: null,
        //     });
        // else
        // this.setState({
        //     groups: groups, 
        //     isGroupModalOpened: !this.state.isGroupModalOpened, 
        //     openedGroup: null
        // });
    }

    removeGroup(id) {
        var groups = this.state.groups;

        Object.keys(groups).forEach((key, idOfKey) => {
            // console.log(key +" "+ this.state.groups[key] +" "+ id);
            if(id == idOfKey) delete groups[key];
        });

        console.log(groups[id]);
        this.setState({groups: groups});
    }



    controlPlayerModal = (id) => {
        if(id != null)
            this.setState({isPlayerModalOpened: !this.state.isPlayerModalOpened, openedPlayer: id});
        else this.setState({isPlayerModalOpened: !this.state.isPlayerModalOpened, openedPlayer: null});
    }

    savePlayer = (id, newPlayer) => {
        var players = this.state.players;

        if(id == null) {
            players[newPlayer.name] = {
                prefix: newPlayer.prefix,
                name: newPlayer.name,
                suffix: newPlayer.suffix,
                groups: newPlayer.groups,
                permissions: newPlayer.permissions
            }

            this.setState({
                players: players, 
                isPlayerModalOpened: !this.state.isPlayerModalOpened, 
                openedPlayer: null
            });
        }
        else {
            Object.keys(players).forEach((key, idOfKey) => {
                if(id == idOfKey) {
                    // console.log(key +" "+ groups[key] +" "+ id);
                    // console.log(key +" "+ newGroup.name +" "+ id);

                    // Object.defineProperty(groups, newGroup.name, Object.getOwnPropertyDescriptor(groups, key));
                    // groups[newGroup.name] = groups[key];

                    

                    var temp = {
                        prefix: newPlayer.prefix,
                        name: newPlayer.name,
                        suffix: newPlayer.suffix,
                        groups: newPlayer.groups,
                        permissions: newPlayer.permissions
                    }

                    if(players[key] != newPlayer.name)
                        delete players[key];

                    players = this.addToObject(players, newPlayer.name, temp, idOfKey);  
                };
            });

            this.setState({
                players: players, 
                isPlayerModalOpened: !this.state.isPlayerModalOpened, 
                openedPlayer: null
            });
        }
    }

    removePlayer = () => {
        // var titles = [];
        // document.querySelectorAll("span.style-scope.ytd-playlist-video-renderer").forEach(element => {
        //     console.log(element.innerHTML);
        // });

        // document.querySelectorAll("span.listItem__properties.black.default").forEach((el, id) => {
        //     titles[id] = titles[id].concat(" - "+el.innerHTML);
        // });
        // console.log(titles);

        var players = this.state.players;

        Object.keys(players).forEach((key, idOfKey) => {
            // console.log(key +" "+ this.state.groups[key] +" "+ id);
            if(id == idOfKey) delete players[key];
        });

        console.log(groups[id]);
        this.setState({groups: groups});
    }

    loadPexFile = (file) => {
        var fileReader;

        fileReader = new FileReader();
        fileReader.onloadend = () => {
            var content = fileReader.result;

            var yaml = YAML.safeLoad(content);

            this.setState({groups: yaml.groups});
        };
        fileReader.readAsText(file);
    }

    downloadPexFile = () => {
        var yaml = {};

        var groups = this.state.groups;
        // yaml.groups = groups;    

        // this.state.groups.map((group, id) => {
        //     group.push()
        // })

        // Object.keys(this.state.groups).forEach((group, id) => {
        //     // console.log(key +" "+ this.state.groups[key] +" "+ id);
        //     groups.push(this.state.groups[group]);
        // })

        yaml.groups = groups;


        const element = document.createElement("a");
        const file = new Blob([YAML.safeDump(yaml)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "permissions.yml";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        return (
            <div>
                <nav>
                    <h1>PexGen</h1>
                </nav>

                <section className="content">
                    <div className="groups">
                        <div className="title_wrapper">
                            <h2>Groups</h2>
                            <a onClick={() => this.controlGroupModal(null)}><i className="fas fa-plus"></i></a>
                        </div>

                        {(this.state.groups != null && this.state.groups != "" && this.state.groups != []) ? (
                            <div className="wrapper contentful">
                                <div className="scroll">
                                    {
                                        // Object.keys(this.state.groups).forEach((key, id) => (
                                        //     // console.log(key, obj[key]);
                                        //     <div className="group_item" key={id}>
                                        //         <h3>{key}</h3>

                                        //         <div className="controls">
                                        //             <a onClick={() => this.controlGroupModal(id)}><i className="fas fa-pen"></i></a>
                                        //             <a onClick={() => this.removeGroup(id)}><i className="fas fa-times"></i></a>
                                        //         </div>
                                        //     </div>
                                        // ))

                                        this.getGroups()
                                    }
                                    {/* {this.state.groups.map((group, id) => 
                                        <div className="group_item" key={id}>
                                            <h3>{group.name}</h3>

                                            <div className="controls">
                                                <a onClick={() => this.controlGroupModal(id)}><i className="fas fa-pen"></i></a>
                                                <a onClick={() => this.removeGroup(id)}><i className="fas fa-times"></i></a>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    
                    {/* (
                            <div className="wrapper empty">
                                <a className="add" onClick={this.controlGroupModal}>Add group</a>
                            </div>
                        ) */}

                    <div className="players">
                        <div className="title_wrapper">
                            <h2>Players</h2>
                            <a onClick={this.controlPlayerModal}><i className="fas fa-plus"></i></a>
                        </div>

                        {this.state.players ? (
                            <div className="wrapper contentful">
                                {/* {this.state.players.map(player => 
                                    <div className="player_item">
                                        {player.name}
                                    </div>
                                )} */}
                                {this.getPlayers()}
                            </div>
                        ) : null}
                    </div>

                    <div className="last">
                        <input type='file'
                            // id='file'
                            // className='input-file'
                            accept='.yml'
                            onChange={(e) => this.loadPexFile(e.target.files[0])}
                            ref={(fileBrowser) => { this.fileBrowser = fileBrowser }}
                        />

                        <a onClick={() => {this.fileBrowser.click()}} className="open">Load permissions.yml</a>
                        <a onClick={this.downloadPexFile} className="download">Download permissions.yml</a>
                    </div>

                    {this.state.isGroupModalOpened ? <GroupModal controlGroupModal={this.controlGroupModal} saveGroup={this.saveGroup} groups={this.state.groups} openedGroup={this.state.openedGroup} defaultAt={this.state.defaultAt} /> : null}
                    {this.state.isPlayerModalOpened ? <PlayerModal controlPlayerModal={this.controlPlayerModal} savePlayer={this.savePlayer} players={this.state.players} openedPlayer={this.state.openedPlayer} /> : null}
                </section>
            </div>
        );
    }
}

export default App;