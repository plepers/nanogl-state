
import GLConfig, { DAT_MASKS, DAT_SIZE } from './config'






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


class ConfigStack {

  private _stack  : Uint16Array;
  private _sets   : Uint32Array;

  private _size   : number     ;
  private _ptr    : number     ;
  private _headPos: number     ;

  private readonly _wcfg : GLConfig;

  constructor(){
    this._stack = new Uint16Array( ( (LEN|0) * MIN_ALLOC)|0 );
    this._sets  = new Uint32Array( MIN_ALLOC|0 );
    this._size  = MIN_ALLOC|0;
    this._ptr   = 0;

    this._headPos = 0;
    this._wcfg = new GLConfig();
  }




  initFromGL( gl : WebGLRenderingContext )
  {
    this._ptr = 0;
    this._wcfg.fromGL( gl );
    this._sets[0] = 0;
    this._stack.set( this._wcfg._dat );
  }


  push( cfg : GLConfig ){

    if( this._ptr+1 === this._size ){
      this._grow();
    }

    const lset=  cfg._set,
          ptr = ++this._ptr,
          sptr = ptr*(0|LEN),
          ldat = cfg._dat,
          sdat = this._stack;

    this._sets[ptr] = this._sets[ptr-1] | lset;

    
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


  pop() {
    const ptr = --this._ptr;

    if( this._headPos > ptr ){
      this._sets[ptr] |= this._sets[ptr+1];
      this._headPos = ptr;
    }

  }


  flush(){
    while( this._ptr>0 ){
      this.pop();
    }
  }


  commit( patch : GLConfig ){
    const ptr = this._ptr;

    this.copyConfig( ptr, patch );

    this._headPos = ptr;
    if( ptr > 0 ) { 
      this._sets[ ptr-1 ] |= this._sets[ ptr ];
    }
    this._sets[ ptr ] = 0;

  }


  patch( cfg : GLConfig, out : GLConfig ){
    this.copyConfig( this._ptr, this._wcfg );
    this._wcfg.patch( cfg, out );
  }


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
