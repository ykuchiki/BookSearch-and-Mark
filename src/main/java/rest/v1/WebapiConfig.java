package rest.v1;

import org.glassfish.jersey.server.ResourceConfig;
import jakarta.ws.rs.ApplicationPath;

/**
 * Sample program to configure this package
 * @version 2022-06-16 from 2019-05-13
 * @author nakano@cc.kumamoto-u.ac.jp
 *	The WebAPI classes in this package can be called with webapi/v1/@Path .<br>
 *  このパッケージの中のWebAPIクラスは，webapi/v1/@Path で呼び出せる．
 */

@ApplicationPath("v1")
public class WebapiConfig extends ResourceConfig {
    public WebapiConfig() {
        packages(this.getClass().getPackage().getName());
    }
}