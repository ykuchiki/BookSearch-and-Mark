package model;

public class BSaM {
	
	private String image;
	private String link;
	private String description;
	private String title;

	/**
	 * Constructor / コンストラクタ
	 */
	public BSaM() {
	}
	public BSaM(String title, String description, String link, String image) {
		this.title = title;
		this.description = description;
		this.link = link;
		this.image = image;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
}
