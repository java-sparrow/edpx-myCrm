/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * foo.js ~ 2014-05-06 23:11:50
 * @author xlst(x_l_st@126.com)
 * @version $Revision$ 
 * @description 
 * edp crm foo command
 **/
exports.cli = {
    description: '这个是必须的，用来简单的描述命令所做的事情',
    options: [ 'hello', 'world:' ],
    main: function( args, opts ) {
        console.log( 'Arguments = ' + JSON.stringify( args ) );
        console.log( 'Options = ' + JSON.stringify( opts ) );
    }
};
