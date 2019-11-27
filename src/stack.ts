
import GLConfig from './config'

const DAT_MASKS = GLConfig.DAT_MASKS;

const MIN_ALLOC = 16,
      LEN = 51;


//   A, B, C, D, E, F, ?   -- initial config
//   1, 1, 1, 1, 1, 1, 0
//
//   ?, ?, X, D, ?, ?, ?   -- push config
//   0, 0, 1, 1, 0, 0, 0   -- cfg set
//   1, 1, 1, 1, 1, 1, 0   -- new set
//   0, 0, 0, 1, 0, 0, 0   -- diffs
//
//


export default class ConfigStack {

  private _stack  : Uint32Array;
  private _sets   : Uint32Array;
  private _size   : number     ;
  private _ptr    : number     ;
  private _headPos: number     ;
  private _wcfg   : GLConfig   ;

  constructor(){
    this._stack = new Uint32Array( ( (LEN|0) * MIN_ALLOC)|0 );
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
    var ptr = this._ptr,
        sset = this._sets[ptr++],
        lset=  cfg._set,
        sptr, sdat, ldat, i, sbit, val;

    if( ptr === this._size ){
      this._grow();
    }

    sset |= lset;
    this._sets[ptr] = sset;
    this._ptr = ptr;
    sptr = ptr*(0|LEN);

    sdat = this._stack;
    ldat = cfg._dat;


    for( i = 0; i < (LEN|0); i++ )
    {
      sbit = DAT_MASKS[ i ];
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
    var ptr = --this._ptr;

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
    var ptr = this._ptr;

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
    var cdat = cfg._dat,
        sdat = this._stack,
        off  = 0|(at*(LEN|0));

    for( var i = 0; i < (LEN|0); i++ )
    {
      cdat[i] = sdat[off+i];
    }
    cfg._set = this._sets[at];
  }


  private _grow(){
    var s      = this._size << 1,
        stack  = new Uint32Array( s * (0|LEN) ),
        sets   = new Uint32Array( s );

    stack.set(  this._stack, 0 );
    sets.set(  this._sets, 0 );

    this._stack = stack;
    this._sets = sets;
    this._size = s;
  }

};


