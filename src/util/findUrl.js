//公共模块,接口维护
import sysUrl from '../api/sysUrl'
import proudctUrl from '../api/proudctUrl'

export default function(str) {
  let host = '/'
  let path = sysUrl(str) || proudctUrl(str)
  if (!path) {
    alert('接口未找到,请在 sysApi.proudctApi.js 中详细比对')
    return str;
  }
  return `${host}${path}`
}