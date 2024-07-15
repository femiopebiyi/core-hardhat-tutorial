// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    //boolean, uint, int, address, bytes

    // this gets initialized to 0
    uint256 favNum;

    //   People public person = People({
    //      favNum: 2, name: "patrick star"
    //   });

    mapping(string => uint256) public nameToFavNum;

    struct People {
        string name;
        uint256 favNum;
    }

    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        favNum = _favoriteNumber;
    }

    //view and pure function
    function retrieve() public view returns (uint256) {
        return favNum;
    }

    function add(uint256 numOne, uint256 numTwo) public returns (uint256) {
        uint256 addition = (numOne + numTwo);
        favNum = addition;
        return favNum;
    }

    //calldata memory and storage
    function addPerson(string memory _name, uint256 _favNum) public {
        //People memory newPerson = People({favNum: _favNum, name: _name});
        people.push(People(_name, _favNum));
        nameToFavNum[_name] = _favNum;
    }

    function retrieveList() public view returns (People memory) {
        require(people.length > 0, "No people in the list");
        return people[0];
    }
}

//0xd9145CCE52D386f254917e481eB44e9943F39138
