/// <reference types="node" />
import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();
const notion_token = process.env.NOTION_TOKEN!;
const notion_db_id = process.env.NOTION_DB_ID!;
const notion_client = new Client({ auth: notion_token });

export async function getToNotion(name: string) {
  try {
    const response = await notion_client.databases.query({
      database_id: notion_db_id,
      filter: {
        property: "name",
        title: {
          equals: name,
        },
      },
    });
    return response.results;
  } catch (error) {
    console.error("notion api failed to get : ", error);
    return [];
  } 
}
export async function saveToNotion(name: string, json: string) {
  try {
    const existing_pages = await getToNotion(name);
    const properties = {
      name: {
        title: [{text: {content: name}}],
      },
      store: {
        rich_text: [{text: {content: json}}]
      }
    };
    if (existing_pages.length>0) {
      const page_id=existing_pages[0].id;
      await notion_client.pages.update({
        page_id: page_id,
        properties: properties,
      });
    } else {
      await notion_client.pages.create({
        parent: {database_id: notion_db_id},
        properties: properties,
      })
    }
  } catch (error) {
    console.error("notion api failed to save : ", error);
    throw error;
  }
}
