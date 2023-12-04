
import GLConfig, { DAT_MASKS, DAT_SIZE } from './GLConfig'






const MIN_ALLOC = 16,
      LEN = DAT_SIZE;


//   A, B, C, D, E, F, ?   -- initial config
//   1, 1, 1, 1, 1, 1, 0
//
//   ?, ?, X, D, ?, ?, ?   -- push config
//   0, 0, 1, 1, 0, 0, 0   -- cfg set
//   1, 1, 1, 1, 1, 1, 0   -- new set
//   0, 0, 0, 1, 0, 0, 0   -- diffs
//
//

/**
 * This class manages the GLConfig stack.
 */
class ConfigStack {


  /**
   * The values of the configs at each position in the stack.
   * The stack is a 2d array where each row is a config.
   */
  private _stack  : Uint16Array;


  /**
   * The list of the bitmask set of all the configs in the stack
   */
  private _sets   : Uint32Array;


  /**
   * The allocated size of the stack
   */
  private _size   : number     ;

  /**
   * The current position in the stack
   */
  private _ptr    : number     ;

  /**
   * The position in the stack of the last "commit"
   */
  private _headPos: number     ;

  /**
   * The position in the stack of the last "commit"
   */
  private readonly _wcfg : GLConfig;

  constructor(){
    this._stack = new Uint16Array( ( (LEN|0) * MIN_ALLOC)|0 );
    this._sets  = new Uint32Array( MIN_ALLOC|0 );
    this._size  = MIN_ALLOC|0;
    this._ptr   = 0;

    this._headPos = 0;
    this._wcfg = new GLConfig();
  }



  /**
   * Setup initial config from to match the config the
   * given webgl context is currently in, and set the
   * first config of the stack to this config.
   *
   * @param {WebGLRenderingContext} gl The webgl context to match
   */
  initFromGL( gl : WebGLRenderingContext )
  {
    this._ptr = 0;
    this._wcfg.fromGL( gl );
    this._sets[0] = 0;
    this._stack.set( this._wcfg._dat );
  }


  /**
   * Add a config to the stack.
   *
   * The input config is applied to the previous config in the stack,
   * and the resulting config is added to the stack.
   *
   * @example
   * If the previous config in the stack is:
   *
   * ```js
   * [A, B, C, D, E, F, G] // previous row in _stack
   * [1, 0, 0, 1, 1, 1, 0] // previous row in _sets
   * ```
   *
   * And the input config is :
   *
   * ```js
   * [?, ?, X, D, E, ?, ?] // cfg _dat
   * [0, 0, 1, 1, 1, 0, 0] // cfg _set
   * ```
   *
   * Then the new config in the stack is:
   *
   * ```js
   * [A, B, X, D, E, F, G] // new row in _stack
   * [1, 0, 1, 1, 1, 1, 0] // new row in _sets
   * ```
   *
   * @param {GLConfig} cfg The config to add to the stack
   */
  push( cfg : GLConfig ){

    if( this._ptr+1 === this._size ){
      this._grow();
    }

    const lset=  cfg._set,
          ptr = ++this._ptr,
          sptr = ptr*(0|LEN),
          ldat = cfg._dat,
          sdat = this._stack;

    // set a new row in the _sets, whitch is the unionof the previous row and the input cfg set
    this._sets[ptr] = this._sets[ptr-1] | lset;

    // set a new row in the _stack
    // use input cfg data if cfg set is on for the given data, else use the data in the previous row
    for( var i = 0; i < (LEN|0); i++ )
    {
      var sbit = DAT_MASKS[ i ];
      var val : number;
      if( 0 !== ( lset & sbit ) ) {
        val = ldat[ i ];
      }
      else {
        val = sdat[ sptr+i-(0|LEN) ];
      }
      sdat[ sptr+i ] = val;
    }

  }

  /**
   * Remove the last config from the stack.
   *
   * If the HEAD position is ahead of the current position in the stack,
   * the current position config set is unioned with the removed config set.
   */
  pop() {
    const ptr = --this._ptr;

    if( this._headPos > ptr ){
      this._sets[ptr] |= this._sets[ptr+1];
      this._headPos = ptr;
    }

  }

  /**
   * Remove all configs from the stack.
   */
  flush(){
    while( this._ptr>0 ){
      this.pop();
    }
  }

  /**
   * Copy the current stack state to the given patch config and mark HEAD as the current position.
   * @param {GLConfig} patch The config to copy to
   */
  commit( patch : GLConfig ){
    const ptr = this._ptr;

    this.copyConfig( ptr, patch );

    this._headPos = ptr;
    if( ptr > 0 ) {
      this._sets[ ptr-1 ] |= this._sets[ ptr ];
    }
    this._sets[ ptr ] = 0;

  }


  // patch( cfg : GLConfig, out : GLConfig ){
  //   this.copyConfig( this._ptr, this._wcfg );
  //   this._wcfg.patch( cfg, out );
  // }

  /**
   * Copy a row in the stack to the given config.
   *
   * This will copy the row from `_stack` to the config `_dat`
   * and the row from `_set` to the config `_set`.
   *
   * @param at The position in the stack to copy from
   * @param cfg The config to copy to
   */
  copyConfig( at : number, cfg : GLConfig )
  {
    const cdat = cfg._dat,
          sdat = this._stack,
          off  = 0|(at*(LEN|0));

    for( var i = 0; i < (LEN|0); i++ )
    {
      cdat[i] = sdat[off+i];
    }
    cfg._set = this._sets[at];
  }

  /**
   * Grow the allocated size of stack.
   */
  private _grow(){
    const s      = this._size << 1,
          stack  = new Uint16Array( s * (0|LEN) ),
          sets   = new Uint32Array( s );

    stack.set(  this._stack, 0 );
    sets.set(  this._sets, 0 );

    this._stack = stack;
    this._sets = sets;
    this._size = s;
  }

};

export default ConfigStack
