package model;
import java.util.ArrayList;
import java.util.LinkedHashMap;

import dao.Dao;

/**
 * @author nakano@cc.kumamoto-u.ac.jp
 * @version 2022-07-07 applied for DB / DB対応
 * @since 2015-05-07
 * 
 * database version
 */
public class Model {
	private Dao dao = new Dao();
	
	public void setBSaM(String title, String description, String link, String image) {
		BSaM c = new BSaM();

		if(title == null) title = "";
		if(title.isEmpty()) title = "NO TITLE";
		c.setTitle(title);
		//c.setSender(sender.replaceAll("\\<.+?>", ""));
		if(description == null) description = "";
		if(description.isEmpty()) description = "取得したAPIに説明はありませんでした";
		c.setDescription(description);

		//c.setContent(content.replaceAll("\\<.*?>",""));
		if(link == null) link = "";
		if(link.isEmpty()) link = "";
		c.setLink(link);
		if(image == null) image = "";
		if(image.isEmpty()) image = "no_image.jpg";
		c.setImage(image);
		dao.insert(c);
	}
	
	// for WebAPI (JSON)
	public ArrayList<LinkedHashMap<String,Object>> getHistoryJSON() {
		ArrayList<LinkedHashMap<String,Object>> ret = new ArrayList<LinkedHashMap<String,Object>>();
		ArrayList<BSaM> cmts = dao.getAll();
		for(BSaM c : cmts) {
			LinkedHashMap<String,Object> line = new LinkedHashMap<String,Object>();
			line.put("title", c.getTitle());
			line.put("description", c.getDescription());
			line.put("link", c.getLink());
			line.put("image", c.getImage());
			ret.add(line);
		}
		return ret;
	}

	// delete all data
	public void init() {
		dao.deleteAll();
	}
}